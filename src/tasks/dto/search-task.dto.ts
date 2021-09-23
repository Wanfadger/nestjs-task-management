import { TaskStatus } from "../task-status.enum"

export class SearchTaskDto{
    searchTerm:string
    status:TaskStatus
}