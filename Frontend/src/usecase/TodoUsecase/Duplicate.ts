import type { ReqCreateDTO } from "../../domain/dto/todoDTO/index";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


export class DuplicateUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(id: string): Promise<void> {
        
        const todo = await this.todoRepo.FindByID(id)

        const duplicateInput: ReqCreateDTO = {
            title: `${todo.title}のコピー`,
            body: todo.body ? todo.body : undefined,
            due_date: undefined 
        }

        this.todoRepo.Create(duplicateInput)
    }
}