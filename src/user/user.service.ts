import {  Injectable, NotFoundException } from '@nestjs/common';
import { PatchUserPadInformationDto } from './dto/in/PatchUserPadInformation.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaClient){}
    async getUserPersonalCommand(userId: string) {
      const userCommand = await this.prisma.user.findUnique({
        select:{
          user_game_command: true,
        },
        where:{
          user_id: userId
        }
      });
      console.log(userCommand);
      if(userCommand !== null){
        return {
          MESSAGE: 'Get UserCommand Success!',
          STATUS_CODES: 200,
          userCommand,
        }
      }
      else{
        throw new NotFoundException();
      }
    }

    async modifyUserPersonalCommand(userId: string, patchUserPadInformationDto: PatchUserPadInformationDto) {
        const existedUserId = await this.prisma.user.findUnique({
          select:{
            user_id: true,
          },
          where:{
            user_id: userId,
          },
        });
        if(existedUserId !== null && existedUserId.user_id === userId){
          const user = await this.prisma.user.update({
            select:{
              nickname: true,
              user_game_command: true,
            },
            where:{
              user_id: existedUserId.user_id
            },
            data:{
              user_game_command: patchUserPadInformationDto.userGameCommand,
            }
          });
          return {
            MESSAGE: 'Patch UserCommand Success!',
            STATUS_CODES: 200,
            user,
          }
        }
        else{
          if(existedUserId === null){
            throw new NotFoundException();
          }
          else{

          }
        }
    }
}
