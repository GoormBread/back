import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { throwErrorHttp } from 'src/error';
import { PostGameDto } from './dto/in/PostGame.dto';

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

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true}))
  @Post()
  async postGameInformation(@Body() postGameDto: PostGameDto) {
    try{
        return await this.gameService.postGameInfo(postGameDto);
    } catch (error) {
        throwErrorHttp(error);
    }
  }

  @Delete('/:gameId')
  async deleteGameInformation(@Param('gameId') gameId: string){
    try{
        return await this.gameService.removeGameInfo(gameId);
    } catch (error) {
        throwErrorHttp(error);
    }
  }
}
