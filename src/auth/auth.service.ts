import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { retry } from 'rxjs';

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
        if(user && (user.password === authCredentialsDto.password)){
            return "success"
        }else{
            throw new UnauthorizedException("Inavlid Username or password")
        }
    }

}
