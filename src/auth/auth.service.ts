import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/in/Login.dto';
import { SaveUserDto } from './dto/in/SaveUser.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(@InjectRedis() private readonly redis: Redis, private readonly prisma: PrismaClient){}
  async logout(request: Request) {
    throw new Error('Method not implemented.');
  }
  async login(loginDto: LoginDto) {
    throw new Error('Method not implemented.');
  }
  async saveUser(saveUserDto: SaveUserDto) {
    throw new Error('Method not implemented.');
  }
}
