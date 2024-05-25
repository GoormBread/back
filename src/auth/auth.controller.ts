import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    //Pipe 사용
    @Post('/register')
    async registerUser(@Body() ){
        
    }

    //Pipe 사용
    @Post('/login')
    async login(@Body() ){

    }

    //Cookie의 Seesion ID 사용
    @Post('/logout')
    async logout(){

    }

}
