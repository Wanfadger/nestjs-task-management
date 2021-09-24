import { JwtPayload } from './jwt-payload';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UsersRepository)
        private _usersRepository: UsersRepository , private _jwtService:JwtService) { }


    createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this._usersRepository.createUser(authCredentialsDto)
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}> {
        const user = await this._usersRepository.findOne({username: authCredentialsDto.username})
        if(user && (await bcrypt.compare(authCredentialsDto.password, user.password))){
            const jwtPayload:JwtPayload = {id:user.id , username:user.username}
            const accessToken:string = await this._jwtService.sign(jwtPayload)
            return {accessToken}
        }else{
            throw new UnauthorizedException("Inavlid Username or password")
        }
    }

}
