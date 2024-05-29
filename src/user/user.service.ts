import { Injectable } from '@nestjs/common';
import { PatchUserPadInformationDto } from './dto/in/PatchUserPadInformation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaClient){}
    async getUserPersonalCommand(userId: string) {
        
        
    }
    async modifyUserPersonalCommand(userId: string, patchUserPadInformationDto: PatchUserPadInformationDto) {
        
    }
}
