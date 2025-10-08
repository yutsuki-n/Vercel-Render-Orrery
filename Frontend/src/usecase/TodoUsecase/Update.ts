import type { ReqUpdateDTO } from "../../domain/dto/todoDTO/index";
import type { ITodoRepository } from "../../domain/Irepository/ITodoRepository";
import type { Title, Body, DueDate, CompletedAt } from "../../domain/valueObject";


export class UpdateUsecase {
    private readonly todoRepo: ITodoRepository

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo 
    }

    async Execute(id: string,
                  title?: Title,
                  body?: Body,
                  dueDate?: DueDate, 
                  completeAt?: CompletedAt): Promise<void>
    {
        const updateInput: ReqUpdateDTO = { 
            title: title?.Value(),
            body: body?.Value(),
            due_date: dueDate === undefined ? undefined
                        : dueDate.Value() === null ? null
                                : dueDate.Value()?.toISOString().split("T")[0],

            completed_at: completeAt === undefined ? undefined
                            : completeAt.Value() === null ? null
                                : completeAt.Value()?.toISOString().split("T")[0],
        }

        await this.todoRepo.Update(id, updateInput)
    }
}