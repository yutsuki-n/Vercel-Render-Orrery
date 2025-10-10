import type { ReqListDTO, ResTodoDTO } from "../../domain/dto/todoDTO/index";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";
import type { DueDate, Title, Body } from "../../domain/valueObject";


export class ListUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo
    }

    async Execute(title?: Title,
                  body?: Body,
                  dueDateFrom?: DueDate,
                  dueDateTo?: DueDate,
                  completed?: boolean): Promise<ResTodoDTO[]>
    {
        const ListInput: ReqListDTO = {
            title: title?.Value(),
            body: body?.Value() ?? undefined,
            due_date_from: dueDateFrom?.Value()?.toISOString().split("T")[0],
            due_date_to: dueDateTo?.Value()?.toISOString().split("T")[0],
            completed: (completed === undefined) ? undefined : completed ? "true" : "false"
        }

        const todos = await this.todoRepo.FindAll(ListInput)
        return todos
    }
}