import { UpdateTaskDto } from './dto/update-task.dto';
import { CreatTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private _tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this._tasksService.getAllTasks()
    }

    @Get(":id")
    getAllTaskById(@Param("id") id: string): Task {
        return this._tasksService.getAllTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreatTaskDto): Task {
        //console.log('body', body)
        return this._tasksService.createTask(createTaskDto)
    }

    @Delete(":id")
    deleteTaskById(@Param("id") id: string) {
        this._tasksService.deleteTaskById(id)
    }

    @Put(":id")
    updateTask(@Param("id") id: string, @Body() body: UpdateTaskDto): Task {
        body.id = id
        return this._tasksService.updateTask(body)
    }



}
