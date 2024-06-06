import { Injectable, NotFoundException } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from 'http';

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaClient) { }
    async getGameCommand(gameId: string) {
        const gameCommand = await this.prisma.game.findUnique({
            select: {
                game_command: true
            },
            where: {
                game_id: gameId,
            },
        });
        if (gameCommand !== null) {
            return {
                MESSAGE: 'Get GameCommand Success!',
                STATUS_CODES: 200,
                gameCommand,
            };
        }
        else {
            throw new NotFoundException();
        }
    }

    async getGameInfo(gameId: string) {
        const gameInfo = await this.prisma.game.findUnique({
            where: {
                game_id: gameId,
            },
        });
        if (gameInfo !== null) {
            return {
                MESSAGE: 'Get GameInfo Success!',
                STATUS_CODES: 200,
                gameInfo,
            };
        }
        else {
            throw new NotFoundException();
        }
    }

    async getAllGameInformation() {
        const allGameInfo = await this.prisma.game.findMany();
        return {
            MESSAGE: 'Get AllGameInfo Success!',
            STATUS_CODES: 200,
            allGameInfo,
        };
    }
}
