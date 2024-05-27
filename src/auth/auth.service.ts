import {  Injectable, InternalServerErrorException, NotFoundException, Req, Session, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/in/Login.dto';
import { SaveUserDto } from './dto/in/SaveUser.dto';

import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { SALT } from 'src/config';
import { Request } from 'express';

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

@Injectable()
export class AuthService {
  constructor( private readonly prisma: PrismaClient){}
  async logout(request: Request) {
    request.session.destroy((err)=>{
      if(err)
        throw new InternalServerErrorException();
    })
    return {
      MESSAGE: 'logout success',
      STATUS_CODE: 200,
    }
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
          STATUS_CODE: 200,
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
    const hashedPassword = await hash(saveUserDto.password, SALT);
    const user = await this.prisma.user.create({
      data:{
        user_id: saveUserDto.userId,
        password: hashedPassword,
        nickname: saveUserDto.nickname,
        user_game_command: JSON.stringify(saveUserDto.userGameCommand),
      }
    });
    return {
      MESSAGE: 'user register success',
      STATUS_CODE: 201,
      user,
    }
  }
}
