import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisModule } from './redis/redis.module';
import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';
import { setUpSession } from './redis/redis.session';
import { LOBBY_REDIS } from './redis/redis.constants';
import { RedisIoAdapter } from './redis/redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redis: Redis = app.get(LOBBY_REDIS);
  const redisIoAdapter = new RedisIoAdapter(app, redis);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  app.enableCors();
  setUpSession(app);

  await app.listen(3000);
}

bootstrap();
