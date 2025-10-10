import type { ReqUpdateDTO } from "../../domain/dto/todoDTO/index";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";
import { Toggle } from "../../interface/TodoController";


export class ToggleUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(id: string): Promise<void> {

        console.log("hello from usecase, id=",id)
        await this.todoRepo.Toggle(id)
    }
}