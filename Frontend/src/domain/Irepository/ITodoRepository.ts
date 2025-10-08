import type { ReqCreateDTO, ReqListDTO, ReqUpdateDTO, ResTodoDTO } from "../dto/todoDTO/index";

export interface ITodoRepository {
    Create(input: ReqCreateDTO): Promise<void>;
    FindAll(input: ReqListDTO): Promise<ResTodoDTO[]>;
    FindByID(input: string): Promise<ResTodoDTO>;
    Update(id: string, input: ReqUpdateDTO): Promise<void>;
    Delete(id: string): Promise<void>;
}