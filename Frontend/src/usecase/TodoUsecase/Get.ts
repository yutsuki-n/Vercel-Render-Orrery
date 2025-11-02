import { Todo } from "@/domain/entity/todo";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";


export class GetUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(id: string): Promise<Todo> {
        const todoDTO = await this.todoRepo.FindByID(id)

        const todo = new Todo(todoDTO.todo_id,
                              todoDTO.user_id,
                              todoDTO.title,
                              todoDTO.body,
                              todoDTO.due_date,
                              todoDTO.completed_at,
                              todoDTO.created_at,
                              todoDTO.updated_at,
        )

        return todo
    }
}