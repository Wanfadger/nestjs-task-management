import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post , Req, Request, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LOGGED_USER } from './decorators/get-user.decorater';

@Controller('auth')
export class AuthController {

    constructor(private _authService:AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<User>{
      return this._authService.createUser(authCredentialsDto)
    }


    @Post('/login')
    login(@Body() authCredentialsDto:AuthCredentialsDto , @Req() req):Promise<{accessToken:string}>{
      console.log(req)
       return this._authService.login(authCredentialsDto)
    }

    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Request() req , @LOGGED_USER() loggedUser:User ){
      console.log(req)
      console.log(loggedUser.username)
    }
    
  


}

