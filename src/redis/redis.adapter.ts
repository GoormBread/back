import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';
import { LOBBY_REDIS } from './redis.constants';
import { Inject } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  constructor(
    app: any,
    @Inject(LOBBY_REDIS) private readonly redis: Redis,
  ) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = this.redis;
    const subClient = pubClient.duplicate();

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const serverOptions: ServerOptions = {
        ...options,
        cors: {
            origin: ['*'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }
    const server = super.createIOServer(port, serverOptions);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
