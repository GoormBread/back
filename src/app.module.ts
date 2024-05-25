import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
    }),
    AuthModule],
  controllers: [],
  providers: [PrismaClient],
  exports: [PrismaClient],
})
export class AppModule {}
