import { TaskRepository } from './tasks.repository';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
   

    constructor(
        @InjectRepository(TaskRepository)
        private _repo: TaskRepository) {

    }

    async getTaskById(id: string , user:User): Promise<Task> {
        const taskFound = await this._repo.findOne({where:{id , user}})
        if (!taskFound) throw new NotFoundException(`Id  ${id} , Not found`)
        return { ...taskFound }
    }


    getAllTasks(): Promise<Task[]> {
        return this._repo.searchTasks(new SearchTaskDto())
    }

    async getUserTasks(user: User): Promise<Task[]> {
     
        return await this._repo.find({user})
    }

    createTask(creatTaskDto: CreatTaskDto , _user:User): Promise<Task> {
        return this._repo.createTask(creatTaskDto , _user)
    }


    async deleteTaskById(id: string , user:User): Promise<void> {
        const result = await this._repo.delete({id , user})
        if (result.affected === 0) throw new NotFoundException(`Task With ID: ${id} not found`)
        console.log(result)
    }




    async updateTask(updateTaskDto: UpdateTaskDto , user:User): Promise<Task> {
        const task = await this.getTaskById(updateTaskDto.id , user)



        if (updateTaskDto.description) task.description = updateTaskDto.description
        if (updateTaskDto.title) task.title = updateTaskDto.title
        if (updateTaskDto.status) task.status = updateTaskDto.status

        await this._repo.save(task)
        return task
    }


    search(searchTaskDto: SearchTaskDto):Promise<Task[]> {
    return this._repo.searchTasks(searchTaskDto)
    }


    searchUserTask(searchTaskDto: SearchTaskDto ,user: User): Promise<Task[]> {
        return this._repo.searchUserTasks(searchTaskDto ,user)
    }
   


}
