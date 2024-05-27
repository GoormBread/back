import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisModule } from './redis/redis.module';
import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';
import { setUpSession } from './redis/redis.session';
// import { Config } from './config/config';
// const app = await NestFactory.create(AppModule);
// const redisClient:Redis = app.get('SESSION_REDIS_CLIENT');
// let redisStore = RedisStore({
//   client: redisClient,
// })


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  setUpSession(app);



  await app.listen(8080);
}

bootstrap();