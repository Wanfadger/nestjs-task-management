
export enum TaskStatus{
    OPEN = "OPEN" ,
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"

}

export class SearchTaskDto{
    searchTerm:string
    status:TaskStatus
}