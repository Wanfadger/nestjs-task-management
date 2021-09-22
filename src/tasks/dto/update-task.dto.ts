import { IsEnum } from 'class-validator';
import { TaskStatus } from './../task.model';

export class UpdateTaskDto{
    id:string
    title:string
    description:string

    @IsEnum(TaskStatus)
    status:TaskStatus
}