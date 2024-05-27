import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { RedisModule } from 'nestjs-redis';



@Module({
  imports: [RedisModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient],
})
export class AuthModule {}
