import {  ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, Req, Res, Session, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/in/Login.dto';
import { SaveUserDto } from './dto/in/SaveUser.dto';

import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { SALT } from 'src/config';
import { Request, Response, response } from 'express';
import { DEFAULT_GAME_COMMAND } from './constants/defaultGameCommand';
import { STATUS_CODES } from 'http';

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

@Injectable()
export class AuthService {
  constructor( private readonly prisma: PrismaClient){}
  async logout(request: Request, response: Response) {
    request.session.destroy((err)=>{
      if(err)
        throw new InternalServerErrorException();
    });
    return response.clearCookie('connect.sid').json({
      MESSAGE: 'logout success',
      STATUS_CODES: 200,
    })
  }


  async login(loginDto: LoginDto, @Req() request: Request) {
    const user = await this.prisma.user.findUnique(
      {
        where:{
          user_id: loginDto.userId,
        }
      }
    )
    if(user !== null){
      if(user && await compare(loginDto.password, user.password)){
        request.session.userId = loginDto.userId;
        return {
          MESSAGE: 'login success',
          STATUS_CODES: 200,
          userId: user.user_id,
          nickname: user.nickname
        }
      }
      else{
        throw new UnauthorizedException();
      }
    }
    else{
        throw new NotFoundException();
    }
  }


  async saveUser(saveUserDto: SaveUserDto) {
    const user = await this.prisma.user.findUnique(
      {
        where:{
          user_id: saveUserDto.userId,
        }
      }
    )
    if(user !== null){
      throw new ForbiddenException();
    }
    else{
      const hashedPassword = await hash(saveUserDto.password, SALT);
      const user = await this.prisma.user.create({
        data:{
          user_id: saveUserDto.userId,
          password: hashedPassword,
          nickname: saveUserDto.nickname,
          user_game_command: DEFAULT_GAME_COMMAND,
        }
      });
      return {
        MESSAGE: 'user register success',
        STATUS_CODES: 201,
      }
    }
  }
    
}
