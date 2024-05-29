import { Global, Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { RedisModule } from './redis/redis.module';
import { LobbyModule } from './lobby/lobby.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    AuthModule,
    RedisModule,
    LobbyModule,
    UserModule,
  ],
  controllers: [UserController],
  providers: [PrismaClient, UserService],
  exports: [PrismaClient],
})
export class AppModule{
  
}
