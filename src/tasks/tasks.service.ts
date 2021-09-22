import { CreatTaskDto } from './dto/create-task.dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchTaskDto, TaskStatus } from './task.model';
import {v4 as uuid} from "uuid"
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    
   
 private tasks :Task[] = []

 getAllTasks():Task[]{
     return [...this.tasks]
 }

 getAllTaskById( id:string):Task{
    const [task , _]  = this.findTask(id)
    if(!task) throw new NotFoundException(`task with id ${task.id}`)
    return {...task}
}

 createTask(creatTaskDto:CreatTaskDto):Task{
     const {title , description} = creatTaskDto
     const task:Task = {
         id:uuid(),
         title:title,
         description:description,
         status:TaskStatus.OPEN   
     }
     this.tasks.push(task)

     return task
 }


 deleteTaskById(id: string) {
  const [_ , index]  = this.findTask(id)
  
  this.tasks.splice(index , 1)
}

findTask(id:string):[Task , number]{
    const index:number = this.tasks.findIndex(t => t.id === id)
    return [this.tasks[index] , index]
}


updateTask(body: UpdateTaskDto):Task {
    const [task , index]  = this.findTask(body.id)
    if(body.description) task.description = body.description
    if(body.title)task.title = body.title
    if(body.status) task.status = body.status

    this.tasks[index] = task
    return task
}


search(searchTaskDto: SearchTaskDto):Task[] {
let tasks = this.getAllTasks()

if(searchTaskDto.status) tasks = tasks.filter(t => t.status === searchTaskDto.status)

if(searchTaskDto.searchTerm) {
    tasks = tasks.filter(t => t.title.includes(searchTaskDto.searchTerm)  || t.description.includes(searchTaskDto.searchTerm))
}

return tasks
}


}
