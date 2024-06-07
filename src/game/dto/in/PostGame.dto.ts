import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsArray, IsObject, IsString } from "class-validator";

export class PostGameDto {
  @ApiProperty({
    description: 'The name of the game',
    example: 'Super Mario',
  })
  @IsString()
  gameName: string;

  @ApiProperty({
    description: 'Information about the game',
    example: 'Super Mario is a platform game developed by Nintendo.',
  })
  @IsString()
  gameInfo: string;

  @ApiProperty({
    description: 'Commands for the game',
    example: { start: 'A', jump: 'B', run: 'Y' },
  })
  @IsObject()
  gameCommand: Prisma.InputJsonObject;

  @ApiProperty({
    description: 'Initial commands for player 1',
    example: ['up', 'down', 'left', 'right'],
  })
  @IsArray()
  init1pCommand: string[];

  @ApiProperty({
    description: 'Initial commands for player 2',
    example: ['w', 's', 'a', 'd'],
  })
  @IsArray()
  init2pCommand: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Game cover image file',
  })
  file: any;
}