import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { LOBBY_REDIS } from './redis.constants';

@Global()
@Module({
  providers: [
    // {
    //   provide: SESSION_REDIS,
    //   useValue: new Redis(process.env.REDIS_SESSION_URL),
    // //   useFactory: () => {
    // //     return new Redis(process.env.REDIS_SESSION_URL);
    // //   },
    // },
    {
      provide: LOBBY_REDIS,
    //   useValue: new Redis(process.env.REDIS_LOBBY_URL),
      useFactory: () => {
        return new Redis(process.env.REDIS_LOBBY_URL);
      },
    },
  ],
  exports: [LOBBY_REDIS],
})
export class RedisModule {}
