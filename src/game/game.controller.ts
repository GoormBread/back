import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { throwErrorHttp } from 'src/error';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/all')
  async getAllGameList() {
    try {
      return await this.gameService.getAllGameInformation();
    } catch (error) {
      throwErrorHttp(error);
    }
  }

  @Get('/:gameId')
  async getGameInformtaion(@Param('gameId') gameId: string) {
    try {
      return await this.gameService.getGameInfo(gameId);
    } catch (error) {
      throwErrorHttp(error);
    }
  }

  @Get('/:gameId/pad')
  async getGameCommand(@Param('gameId') gameId: string) {
    try {
      return await this.gameService.getGameCommand(gameId);
    } catch (error) {
      throwErrorHttp(error);
    }
  }
}
