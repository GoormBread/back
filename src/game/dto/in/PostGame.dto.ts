import { Prisma } from "@prisma/client";
import { IsArray, IsObject, IsString } from "class-validator";

export class PostGameDto {
    @IsString()
    gameName: string;
    @IsString()
    gameInfo: string;
    @IsObject()
    gameCommand: Prisma.InputJsonObject;
    @IsArray()
    init1pCommand: string[];
    @IsArray()
    init2pCommand: string[];
}