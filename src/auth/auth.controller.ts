import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private _authService:AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<User>{
      return this._authService.createUser(authCredentialsDto)
    }


    @Post('/login')
    login(@Body() authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
       return this._authService.login(authCredentialsDto)
    }
    



}
