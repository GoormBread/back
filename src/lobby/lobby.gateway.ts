import { WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LOBBY_REDIS } from 'src/redis/redis.constants';


@WebSocketGateway({transports: ['websocket']})
export class LobbyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @Inject(LOBBY_REDIS) private readonly redisClient: Redis;
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): Promise<void> {
    client.join(room);
    console.log(`${client.id} joined room: ${room}`);

    const userInfo = { userId: client.id, joinTime: Date.now() };
    await this.redisClient.hset(`room:${room}`, client.id, JSON.stringify(userInfo));

    const roomInfo = await this.redisClient.hgetall(`room:${room}`);
    const parsedRoomInfo = {};
    for (const [key, value] of Object.entries(roomInfo)) {
      parsedRoomInfo[key] = JSON.parse(value);
    }

    this.server.to(room).emit('roomInfo', parsedRoomInfo);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket): Promise<void> {
    client.leave(room);
    console.log(`${client.id} left room: ${room}`);

    await this.redisClient.hdel(`room:${room}`, client.id);

    const roomInfo = await this.redisClient.hgetall(`room:${room}`);
    const parsedRoomInfo = {};
    for (const [key, value] of Object.entries(roomInfo)) {
      parsedRoomInfo[key] = JSON.parse(value);
    }

    if (Object.keys(roomInfo).length === 0) {
      await this.redisClient.del(`room:${room}`);
    } else {
      this.server.to(room).emit('roomInfo', parsedRoomInfo);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() payload: { room: string, message: string }, @ConnectedSocket() client: Socket): Promise<void> {
    this.server.to(payload.room).emit('message', payload.message);
  }
}