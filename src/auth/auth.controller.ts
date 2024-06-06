import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  Req,
  Res,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaveUserDto } from './dto/in/SaveUser.dto';
import { LoginDto } from './dto/in/Login.dto';
import { AuthService } from './auth.service';

import { throwErrorHttp } from 'src/error';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Pipe 사용
  @HttpCode(201)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  @Post('/register')
  async registerUser(@Body() saveUserDto: SaveUserDto) {
    try {
      return await this.authService.saveUser(saveUserDto);
    } catch (error) {
      throwErrorHttp(error);
    }
  }

  //Pipe 사용
  @HttpCode(200)
  @Post('/login')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    try {
      return await this.authService.login(loginDto, request);
    } catch (error) {
      throwErrorHttp(error);
    }
  }

  //Cookie의 Seesion ID 사용
  @HttpCode(200)
  @Post('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    try {
      return await this.authService.logout(request, response);
    } catch (error) {
      throwErrorHttp(error);
    }
  }
}
