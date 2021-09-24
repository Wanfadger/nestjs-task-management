import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post , Request, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

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

    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Request() req){
      console.log(req)
    }
    
 


}
