import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


export class DeleteUsecase {
    private readonly todoRepo: ITodoRepository
    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo;
    }

    async Execute(id: string) {
        await this.todoRepo.Delete(id)
    }
}