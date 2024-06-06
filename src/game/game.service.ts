import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostGameDto } from './dto/in/PostGame.dto';
import { STATUS_CODES } from 'http';


@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaClient) {}
    async removeGameInfo(gameId: string) {
        const gameInfo = await this.prisma.game.delete({
            where: {
                game_id: gameId
            },
        });
        if(gameInfo !== null){
            return {
                MESSAGE: 'Delete GameInfo Success!',
                STATUS_CODES: 200,
                gameInfo,
            };
        }
        else{
            throw new NotFoundException();
        }
    }
    
    async postGameInfo(postGameDto: PostGameDto) {
        const gameInfo = await this.prisma.game.create({
            data: {
                game_name: postGameDto.gameName,
                game_info: postGameDto.gameInfo,
                game_command: postGameDto.gameCommand,
                init_1p_command: postGameDto.init1pCommand,
                init_2p_command: postGameDto.init2pCommand,
            }
        });

        return {
            MESSAGE: 'Post GameInfo Success!',
            STATUS_CODES: 201,
            gameInfo,
        }
    }
    async getGameCommand(gameId: string) {
        const gameCommand = await this.prisma.game.findUnique({
            select: {
                game_command: true,
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
        } else {
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
        } else {
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
