import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { PatchUserPadInformationDto } from './dto/in/PatchUserPadInformation.dto';
import { throwErrorHttp } from 'src/error';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get('/:userId/pad')
    async getUserPadInformation(@Param('userId') userId: string){
        try{
            return await this.userService.getUserPersonalCommand(userId);
          }
          catch(error){
            throwErrorHttp(error);
          }
    }

    @Patch('/:userId/pad')
    async patchUserPadInformation(@Param('userId') userId: string, @Body() patchUserPadInformationDto: PatchUserPadInformationDto){
        try{
            return await this.userService.modifyUserPersonalCommand(userId, patchUserPadInformationDto);
          }
          catch(error){
            throwErrorHttp(error);
          }

    }

}
