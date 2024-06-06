import { Prisma } from '@prisma/client';
import { IsObject } from 'class-validator';

export class PatchUserPadInformationDto {
  @IsObject()
  userGameCommand: Prisma.InputJsonObject;
}
