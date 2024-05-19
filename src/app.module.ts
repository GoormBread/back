import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GameModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
