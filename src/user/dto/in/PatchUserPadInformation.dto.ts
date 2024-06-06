import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsObject } from 'class-validator';

export class PatchUserPadInformationDto {
  @ApiProperty({
    description: "사용자 게임 커맨드 JSON",
    example: {
        A: "B",
    }
  })
  @IsObject()
  userGameCommand: Prisma.InputJsonObject;
}
