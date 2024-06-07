import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { throwErrorHttp } from 'src/error';
import { PostGameDto } from './dto/in/PostGame.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('game')
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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true }))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './game-thumbnail',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const fileExt = file.originalname.split('.').pop();
        const filename = `${uniqueSuffix}.${fileExt}`;
        cb(null, filename);
      }
    })
  }))

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        gameData: {
          type: 'string',
          format: 'application/json',
          description: 'Game information in JSON format',
          example: JSON.stringify({
            gameName: 'Super Mario',
            gameInfo: 'Super Mario is a platform game developed by Nintendo.',
            gameCommand: { start: 'A', jump: 'B', run: 'Y' },
            init1pCommand: ['up', 'down', 'left', 'right'],
            init2pCommand: ['w', 's', 'a', 'd'],
          }),
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Game cover image file',
        },
      },
    },
  })
  async postGameInformation(@UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'image/*' }),
      ],
    })) file: Express.Multer.File, @Body('gameData') gameData: string) {
    try {
      const postGameDto: PostGameDto = JSON.parse(gameData);
      postGameDto.file = file;
      return await this.gameService.postGameInfo(postGameDto);
    } catch (error) {
      throwErrorHttp(error);
    }
  }

  @Get('/:gameId/thumbnail')
  async getGameThumbnail(@Param('gameId') gameId: string, @Res() response: Response){
    try{
        const thumbnailName =  await this.gameService.getGameImage(gameId);
        const thumbnailPath = join(process.cwd(), 'game-thumbnail', thumbnailName);
        response.sendFile(thumbnailPath);
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