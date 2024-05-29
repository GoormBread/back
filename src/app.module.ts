import { Global, Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { RedisModule } from './redis/redis.module';
import { LobbyModule } from './lobby/lobby.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    AuthModule,
    RedisModule,
    LobbyModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaClient,],
  exports: [PrismaClient],
})
export class AppModule{
  
}
