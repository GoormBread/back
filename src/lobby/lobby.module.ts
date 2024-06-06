import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyGateway } from './lobby.gateway';

@Module({
  controllers: [],
  providers: [LobbyService, LobbyGateway],
})
export class LobbyModule {}
