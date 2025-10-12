import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


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