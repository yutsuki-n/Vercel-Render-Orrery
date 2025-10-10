import { Body, CompletedAt, DueDate, Title } from "../domain/valueObject";
import { TodoFetch } from "../infrastructure/TodoFetch";
import { CreateUsecase, DeleteUsecase, DuplicateUsecase, GetUsecase, ListUsecase, ToggleUsecase, UpdateUsecase } from "../usecase/TodoUsecase";
import type { ResTodoDTO } from "../domain/dto/todoDTO";


const token = localStorage.getItem("token");
const TF = new TodoFetch(token);

export const Create = async (title: string, body?: string, dueDate?: Date): Promise<void> => {
    const usecase = new CreateUsecase(TF);
    const inputTitle = new Title(title);
    const inputBody = body ? new Body(body) : undefined;
    const inputDueDate = dueDate ? DueDate.NewDueDate(dueDate) : undefined;

    await usecase.Execute(inputTitle, inputBody, inputDueDate);
}

export const Delete = async (id: string):Promise<void> => {
    const usecase = new DeleteUsecase(TF);

    await usecase.Execute(id);
}

export const Duplicate = async (id: string):Promise<void> => {
     const usecase = new DuplicateUsecase(TF);

    await usecase.Execute(id);
}   

export const Get = async (id: string): Promise<ResTodoDTO> => {
    const usecase = new GetUsecase(TF);

    const todo = await usecase.Execute(id);
    return todo;
}

export const List = async (title?: string, body?: string, dueDateFrom?: Date, dueDateTo?: Date, completed?: boolean):Promise<ResTodoDTO[]> =>{
    
    console.log("from controller",title, body, dueDateFrom, dueDateTo,completed)
    const usecase = new ListUsecase(TF)
    const inputTitle = title ? new Title(title) : undefined;
    const inputBody = body ? new Body(body) : undefined;
    const inputFrom = dueDateFrom ? DueDate.FromExisting(dueDateFrom) : undefined;
    const inputTo = dueDateTo ? DueDate.FromExisting(dueDateTo) : undefined;

    console.log("from controller2",inputTitle, inputBody, inputFrom, inputTo)
    const todos = await usecase.Execute(inputTitle, inputBody, inputFrom, inputTo, completed);
    return todos;
}

export const Toggle = async (id: string): Promise<void> => {
    const usecase = new ToggleUsecase(TF);
    console.log("hellofrom controller, id=", id)
    await usecase.Execute(id);
}

export const Update = async (id: string, title?: string, body?: string | null, dueDate?: Date | null, completeAt?: Date | null):Promise<void> => {
    const usecase = new UpdateUsecase(TF);
    const inputTitle = title ? new Title(title) : undefined;
    const inputBody = (body === undefined) ? undefined : new Body(body);
    const inputDueDate = (dueDate === undefined) ? undefined : DueDate.NewDueDate(dueDate);
    const inputCompletedAt = (completeAt === undefined) ? undefined : new CompletedAt(completeAt);

    console.log("from controller", id, inputTitle, inputBody, inputDueDate, inputCompletedAt);
    await usecase.Execute(id, inputTitle, inputBody, inputDueDate, inputCompletedAt);
}