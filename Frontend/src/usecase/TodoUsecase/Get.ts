import type { ResTodoDTO } from "../../domain/dto/todoDTO/index";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


export class GetUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(id: string): Promise<ResTodoDTO> {
        const todo = await this.todoRepo.FindByID(id)
        return todo
    }
}