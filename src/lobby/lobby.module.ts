import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyGateway } from './lobby.gateway';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [RedisModule],
  controllers: [],
  providers: [LobbyService, LobbyGateway],
})
export class LobbyModule {}
