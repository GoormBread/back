import { Body, Controller, NotFoundException, Post, Req, Session} from '@nestjs/common';
import { SaveUserDto } from './dto/in/SaveUser.dto';
import { LoginDto } from './dto/in/Login.dto';
import { AuthService } from './auth.service';

import { throwErrorHttp } from 'src/error';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Pipe 사용
  @Post('/register')
  async registerUser(@Body() saveUserDto: SaveUserDto) {
    try{
        return await this.authService.saveUser(saveUserDto);
    }
    catch(error){
      throwErrorHttp(error);
    }

  }

  //Pipe 사용
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    try{
        return await this.authService.login(loginDto, request);
    }
    catch(error){
      throwErrorHttp(error);
    }
  }

  //Cookie의 Seesion ID 사용
  @Post('/logout')
  async logout(@Req() request: Request) {
    try{
      return await this.authService.logout(request);
    }
    catch(error){
      throwErrorHttp(error);
    }

  }
}
