import { TaskRepository } from './tasks.repository';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private _repo: TaskRepository) {

    }

    async getAllTaskById(id: string): Promise<Task> {
        const taskFound = await this._repo.findOne(id)
        if (!taskFound) throw new NotFoundException(`Id  ${id} , Not found`)
        return { ...taskFound }
    }


    getAllTasks(): Promise<Task[]> {
        return this._repo.searchTasks(new SearchTaskDto())
    }

    createTask(creatTaskDto: CreatTaskDto): Promise<Task> {
        return this._repo.createTask(creatTaskDto)
    }


    async deleteTaskById(id: string): Promise<void> {
        const result = await this._repo.delete(id)
        if (result.affected === 0) throw new NotFoundException(`Task With ID: ${id} not found`)
        console.log(result)
    }



    async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.getAllTaskById(updateTaskDto.id)



        if (updateTaskDto.description) task.description = updateTaskDto.description
        if (updateTaskDto.title) task.title = updateTaskDto.title
        if (updateTaskDto.status) task.status = updateTaskDto.status

        await this._repo.save(task)
        return task
    }


    search(searchTaskDto: SearchTaskDto):Promise<Task[]> {
    // let tasks = this.getAllTasks()

    // if(searchTaskDto.status) tasks = tasks.filter(t => t.status === searchTaskDto.status)

    // if(searchTaskDto.searchTerm) {
    //     tasks = tasks.filter(t => t.title.includes(searchTaskDto.searchTerm)  || t.description.includes(searchTaskDto.searchTerm))
    // }

    return this._repo.searchTasks(searchTaskDto)
    }


}
