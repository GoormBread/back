import { Global, Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    AuthModule,
    RedisModule,
  ],
  controllers: [],
  providers: [PrismaClient],
  exports: [PrismaClient],
})
export class AppModule{
  
}
