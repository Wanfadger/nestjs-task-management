import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(UsersRepository)
        private _usersRepository: UsersRepository) { }


    createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this._usersRepository.createUser(authCredentialsDto)
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const user = await this._usersRepository.findOne({username: authCredentialsDto.username, password: authCredentialsDto.password})
        return user
    }

}
