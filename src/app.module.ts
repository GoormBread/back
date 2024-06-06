import { Global, Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { RedisModule } from './redis/redis.module';
import { LobbyModule } from './lobby/lobby.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';

@Global()
@Module({
  imports: [
    AuthModule,
    RedisModule,
    LobbyModule,
    UserModule,
    GameModule,
  ],
  controllers: [],
  providers: [PrismaClient,],
  exports: [PrismaClient],
})
export class AppModule{
  
}
