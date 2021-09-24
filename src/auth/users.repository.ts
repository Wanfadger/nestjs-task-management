import { EntityRepository , Repository } from 'typeorm';
import { User } from './user.entity'

import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  
  
    async createUser(authCredentialsDto: AuthCredentialsDto):Promise<User> {
        const user = this.create({
            username: authCredentialsDto.username,
            password: "12345"
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