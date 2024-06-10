import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LOBBY_REDIS } from 'src/redis/redis.constants';
import { exec } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

type Lobby = {
  lobbyName: string;
  lobbyDescription: string;
  password: string;
  playerNum: number;
  players: { [key: string]: boolean };
  clients: { [key: string]: string }; // client.id와 playerId 매핑
  lock: boolean;
};

@WebSocketGateway({ namespace: 'backend', transports: ['websocket'] })
export class LobbyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @Inject(LOBBY_REDIS) private readonly redisClient: Redis;
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const lobbies = await this.redisClient.keys('lobby:*');
    for (const lobbyKey of lobbies) {
      const lobby = await this.getLobby(lobbyKey.split(':')[1]);
      if (lobby && lobby.clients[client.id]) {
        const playerId = lobby.clients[client.id];
        await this.handleLeaveLobby({ lobbyId: lobbyKey.split(':')[1], playerId }, client);
      }
    }
  }

  private async getLobby(lobbyId: string): Promise<Lobby> {
    const lobby = await this.redisClient.hgetall(`lobby:${lobbyId}`);
    if (Object.keys(lobby).length === 0) return null; 
    return {
      lobbyName: lobby.lobbyName,
      lobbyDescription: lobby.lobbyDescription,
      password: lobby.password,
      playerNum: Number(lobby.playerNum),
      players: JSON.parse(lobby.players),
      lock: lobby.lock === 'true',
      clients: JSON.parse(lobby.clients),
    };
  }

  private async saveLobby(lobbyId: string, lobby: Lobby) {
    await this.redisClient.hmset(`lobby:${lobbyId}`, {
      lobbyName: lobby.lobbyName,
      lobbyDescription: lobby.lobbyDescription,
      password: lobby.password,
      playerNum: lobby.playerNum.toString(),
      players: JSON.stringify(lobby.players),
      lock: lobby.lock.toString(),
      clients: JSON.stringify(lobby.clients),
    });
  }

  private async acquireLock(lobbyId: string): Promise<boolean> {
    const result = await this.redisClient.set(`lock:${lobbyId}`, 'locked', 'EX', 5, 'NX');
    return result === 'OK';
  }

  private async releaseLock(lobbyId: string): Promise<void> {
    await this.redisClient.del(`lock:${lobbyId}`);
  }

  @SubscribeMessage('getAllLobby')
  async handleGetAllLobbies(@ConnectedSocket() client: Socket) {
    const lobbies = await this.redisClient.keys('lobby:*');
    const allLobbies = await Promise.all(
      lobbies.map(async (lobbyKey) => {
        const lobby = await this.getLobby(lobbyKey.split(':')[1]);
        return lobby;
      })
    );
    client.emit('allLobbies', allLobbies);
  }

  @SubscribeMessage('createLobby')
  async handleCreateLobby(@MessageBody() data: { lobbyId: string; lobbyName: string; lobbyDescription: string; password: string }, @ConnectedSocket() client: Socket) {
    const lobby: Lobby = {
      lobbyName: data.lobbyName,
      lobbyDescription: data.lobbyDescription,
      password: data.password,
      playerNum: 0,
      players: {},
      lock: false,
      clients: {},
    };
    await this.saveLobby(data.lobbyId, lobby);
    client.emit('redirect', `/lobby/${data.lobbyId}`);
  }

  @SubscribeMessage('joinLobby')
  async handleJoinLobby(@MessageBody() data: { lobbyId: string; playerId: string; password: string }, @ConnectedSocket() client: Socket) {
    const acquired = await this.acquireLock(data.lobbyId);
    if (!acquired) {
      client.emit('error', 'Lobby is locked');
      return;
    }

    try {
      const lobby = await this.getLobby(data.lobbyId);
      if (!lobby) {
        client.emit('error', 'Lobby not found');
        return;
      }
      if (lobby.password !== data.password) {
        client.emit('error', 'Incorrect password');
        return;
      }
      if (lobby.playerNum > 2) {
        client.emit('error', 'Lobby is full');
        return;
      }

      lobby.players[data.playerId] = false;
      lobby.playerNum += 1;
      lobby.clients[client.id] = data.playerId;
      await this.saveLobby(data.lobbyId, lobby);

      client.emit('redirect', `/lobby/${data.lobbyId}`);
      this.server.to(data.lobbyId).emit('updateLobby', lobby);
    } finally {
      await this.releaseLock(data.lobbyId);
    }
  }

  @SubscribeMessage('toggleReady')
  async handleToggleReady(@MessageBody() data: { lobbyId: string; playerId: string }, @ConnectedSocket() client: Socket) {
    const lobby = await this.getLobby(data.lobbyId);
    if (!lobby) {
      client.emit('error', 'Lobby not found');
      return;
    }
    lobby.players[data.playerId] = !lobby.players[data.playerId];
    await this.saveLobby(data.lobbyId, lobby);

    const allReady = (lobby.playerNum === 2 && Object.values(lobby.players).every(ready => ready));
    if (allReady) {
      const uuid = uuidv4();
      exec(`helm install game-helm-${uuid} game-helm/game-helm --set uniquePath=${uuid} -n paran-2024`);
      const playerRoutes = Object.keys(lobby.clients).map((clientId, index) => {
        return { clientId, route: `/play-game/${uuid}/${index === 0 ? '1p' : '2p'}` };
      });

      playerRoutes.forEach(({ clientId, route }) => {
        this.server.to(clientId).emit('startGame', route);
      });
    } else {
      this.server.to(data.lobbyId).emit('updateLobby', lobby);
    }
  }

  @SubscribeMessage('leaveLobby')
  async handleLeaveLobby(@MessageBody() data: { lobbyId: string; playerId: string }, @ConnectedSocket() client: Socket) {
    const acquired = await this.acquireLock(data.lobbyId);
    if (!acquired) {
      client.emit('error', 'Lobby is locked');
      return;
    }

    try {
      const lobby = await this.getLobby(data.lobbyId);
      if (!lobby) {
        client.emit('error', 'Lobby not found');
        return;
      }

      delete lobby.players[data.playerId];
      delete lobby.clients[client.id];
      lobby.playerNum -= 1;

      if (lobby.playerNum === 0) {
        await this.redisClient.del(`lobby:${data.lobbyId}`);
      } else {
        await this.saveLobby(data.lobbyId, lobby);
        this.server.to(data.lobbyId).emit('updateLobby', lobby);
      }
    } finally {
      await this.releaseLock(data.lobbyId);
    }
  }
}