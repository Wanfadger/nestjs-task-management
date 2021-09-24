import { TasksService } from './tasks.service';
import { Body, Controller, Get, Param, Post , Delete, Put, Query, UseGuards} from '@nestjs/common';
import { Task } from './task.entity';
import { CreatTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private _tasksService: TasksService) { }

    @Get()
    getAllTasks(): Promise<Task[]>{
        return this._tasksService.getAllTasks()
    }

    @Get(":id")
    getAllTaskById(@Param("id") id: string): Promise<Task> {
        return this._tasksService.getAllTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreatTaskDto): Promise<Task> {
        return  this._tasksService.createTask(createTaskDto)
    }

    @Delete(":id")
    deleteTaskById(@Param("id") id: string):Promise<void> {
       return this._tasksService.deleteTaskById(id)
    }

    @Put(":id")
    updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        updateTaskDto.id = id
        return this._tasksService.updateTask(updateTaskDto)
    }


    @Get("search/by")
    search(@Query() searchTaskDto:SearchTaskDto):Promise<Task[]>{
      console.log(searchTaskDto)
    return this._tasksService.search(searchTaskDto)
    }



}


