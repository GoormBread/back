import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Redis } from 'ioredis';
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

  const config = new DocumentBuilder().setTitle("goormbread api")
                                      .setDescription("구름빵 API입니다.")
                                      .setVersion('1.0')
                                      .addTag('goormbread')
                                      .addServer('http://paran2024.iptime.org/backend')
                                      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
