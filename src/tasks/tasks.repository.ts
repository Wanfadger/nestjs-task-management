import { SearchTaskDto } from './dto/search-task.dto';
import { CreatTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(creatTaskDto:CreatTaskDto):Promise<Task>{
        const {title , description} = creatTaskDto
        const task:Task = this.create({
           title:title,
           description:description,
           status:TaskStatus.OPEN   
       })//create object based on the repository
       await this.save(task)
        return task
    }

   async searchTasks(searchTaskDto:SearchTaskDto):Promise<Task[]>{
      const query = this.createQueryBuilder("task") //tasks provides away how task entity Task entity is referenced
      
      if(searchTaskDto.status){
        //  tasks = tasks.filter(t => t.status === searchTaskDto.status)
        query.andWhere("task.status = :s" , {s:searchTaskDto.status}) 
      }

      if(searchTaskDto.searchTerm){
          query.andWhere("LOWER(task.title) LIKE :s" , {s:`%${searchTaskDto.searchTerm.toLocaleLowerCase()}%`})
          .orWhere("LOWER(task.description) LIKE :s" , {s:`%${searchTaskDto.searchTerm.toLocaleLowerCase()}%`})          
      }

      let tasks:Task[] =  await query.getMany()

     return tasks
    }

}