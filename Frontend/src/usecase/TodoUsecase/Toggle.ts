import type { ReqUpdateDTO } from "../../domain/dto/todoDTO/index";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


export class ToggleUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(id: string): Promise<void> {
        const todo = await this.todoRepo.FindByID(id);

        const now = new Date();
        const ToggleInput: ReqUpdateDTO = {
            completed_at: todo.completed_at ? null : now.toISOString().split("T")[0]
        }

        await this.todoRepo.Update(id, ToggleInput)
    }
}