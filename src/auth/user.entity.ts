import { Task } from './../tasks/task.entity';
import { IsNotEmpty, Matches, MaxLength, MinLength , IsString } from 'class-validator';
import { Column, OneToMany ,PrimaryGeneratedColumn , Entity } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class User{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    @IsString()
    @IsNotEmpty()
    @Column({unique:true})
    username:string

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(32)
    @Matches(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$ / , {message:"password is weak"})
    @Exclude({toPlainOnly:true})
    password:string

    @OneToMany(_task => Task , task => task.user  , {eager:true} )
    tasks:Task[]

}

/*
Description of this regular expression is as below:

Passwords will contain at least 1 upper case letter
Passwords will contain at least 1 lower case letter
Passwords will contain at least 1 number or special character
Passwords will contain at least 8 characters in length
Password maximum length should not be arbitrarily limited


/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
*/