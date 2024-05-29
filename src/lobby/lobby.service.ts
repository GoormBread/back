import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { LOBBY_REDIS } from 'src/redis/redis.constants';
import { LobbyDto } from './dto/in/Lobby.dto';
import { PatchLobbyDto } from './dto/in/PatchLobby.dto';

@Injectable()
export class LobbyService {
    constructor(@Inject(LOBBY_REDIS) private readonly redis: Redis){}
    async getLobbyInformation(lobby_id: string) {
        throw new Error('Method not implemented.');
    }
    async createLobby(lobbyDto: LobbyDto) {
        throw new Error('Method not implemented.');
    }
    async removeLobby(lobby_id: string) {
        throw new Error('Method not implemented.');
    }
    async patchLobby(patchLobbyDto: PatchLobbyDto) {
        throw new Error('Method not implemented.');
    }
    async getAllLobbyInformation() {
        throw new Error('Method not implemented.');
    }   
}
