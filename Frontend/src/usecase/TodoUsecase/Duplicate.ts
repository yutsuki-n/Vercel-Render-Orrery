import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


export class DuplicateUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(id: string): Promise<void> {

        this.todoRepo.Dupulicate(id)
    }
}