import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UsersRepository)
        private _usersRepository: UsersRepository) { }


    createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this._usersRepository.createUser(authCredentialsDto)
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const user = await this._usersRepository.findOne({username: authCredentialsDto.username})
        if(user && (await bcrypt.compare(authCredentialsDto.password, user.password))){
            return "success"
        }else{
            throw new UnauthorizedException("Inavlid Username or password")
        }
    }

}
