import { JwtStrategy } from './jwt-config/jwt.strategy';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports:[TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({secret:"wanfadger" ,  signOptions:{
      expiresIn:3600,
      issuer:"wanfadger-task-management-api",    
    }} , 
    )
  ],
  providers: [AuthService , JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy , PassportModule]
})
export class AuthModule {}
