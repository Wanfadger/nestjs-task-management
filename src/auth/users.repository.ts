import { EntityRepository , Repository } from 'typeorm';
import { User } from './user.entity'

import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  
  
    async createUser(authCredentialsDto: AuthCredentialsDto):Promise<User> {

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(authCredentialsDto.password, salt);
        const user = this.create({
            username: authCredentialsDto.username,
            password: hash
        })

        try {
            await this.save(user)
         } catch (error) {
            // console.log(error)
             if(error.errno === 1062){
                 throw new ConflictException(`Duplicate entry for ${authCredentialsDto.username}`)
             }else{
                 throw new InternalServerErrorException()
             }
         }
    
        return user;
    }

    
    
    

}