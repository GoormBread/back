import { Body, Controller, Post, Req } from '@nestjs/common';
import { SaveUserDto } from './dto/in/SaveUser.dto';
import { LoginDto } from './dto/in/Login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Pipe 사용
  @Post('/register')
  async registerUser(@Body() saveUserDto: SaveUserDto) {
    try{
        return await this.authService.saveUser(saveUserDto);
    }
    catch{

    }

  }

  //Pipe 사용
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try{
        return await this.authService.login(loginDto);
    }
    catch{

    }

  }

  //Cookie의 Seesion ID 사용
  @Post('/logout')
  async logout(@Req() request: Request) {
    try{
        return await this.authService.logout(request);
    }
    catch{

    }

  }
}
