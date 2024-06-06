import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaClient){}
    async getGameCommand(gameId: string) {
        throw new Error('Method not implemented.');
    }
    async getGameInfo(gameId: string) {
        throw new Error('Method not implemented.');
    }
    async getAllGameInformation() {
        throw new Error('Method not implemented.');
    }
}
