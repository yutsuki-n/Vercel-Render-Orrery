import type { ReqCreateDTO } from "../../domain/dto/todoDTO";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";
import { Title, Body, DueDate } from "../../domain/valueObject/index"

export class CreateUsecase {
    private readonly todoRepo: ITodoRepository
    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(title: Title, body?: Body, dueDate?: DueDate): Promise<void> {
        
        
        const createInput: ReqCreateDTO = {
            title: title.Value(),
            body: body?.Value()  ?? undefined,
            due_date: dueDate?.Value()?.toISOString().split("T")[0]
        }

        await this.todoRepo.Create(createInput)
    }
}