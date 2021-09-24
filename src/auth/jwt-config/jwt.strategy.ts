import { User } from './../user.entity';
import { JwtPayload } from './../../../dist/auth/jwt-payload.d';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './../users.repository';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private _usersRepository:UsersRepository){
        super({
            secretOrKey:"wanfadger",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(jwtPayload:JwtPayload):Promise<User>{
        const user = await this._usersRepository.findOne({"id":jwtPayload.id , "username":jwtPayload.username})

        if(!user) throw new UnauthorizedException("Authorized User")

        return user

    }

}