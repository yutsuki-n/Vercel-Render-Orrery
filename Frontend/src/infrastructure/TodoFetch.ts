import type { ReqCreateDTO, ReqListDTO, ReqUpdateDTO, ResTodoDTO } from "../domain/dto/todoDTO";
import type { ITodoRepository } from "../domain/Irepository/ITodoRepository";


export class TodoFetch implements ITodoRepository {
    private jwt: string;
    private baseURL = "http://localhost:8080/todos";

    constructor(jwt: string) {this.jwt = jwt;}


    async Create(input: ReqCreateDTO):Promise<void> {
        const res = await fetch(
            this.baseURL,
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.jwt}`
                },
                body: JSON.stringify(input)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Create");
        }
    }

    async FindAll(input: ReqListDTO):Promise<ResTodoDTO[]> {
        const params = new URLSearchParams();

        if (input.title) {
            params.append("title", input.title);
        }
        if (input.body) {
            params.append("body", input.body);
        }
        if (input.due_date_from) {
            params.append("due_date_from", input.due_date_from);
        }
        if (input.due_date_to) {
            params.append("due_date_to", input.due_date_to);
        }
        
        const query = params.toString()
        const url = query ? `${this.baseURL}?${params.toString()}` : this.baseURL;

        const res = await fetch(
            url,
            {
                method: "GET",
                headers:{
                    "Authorization": `Bearer ${this.jwt}`
                }
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at FindAll")
        }

        const todos: ResTodoDTO[] = await res.json();
        return todos 
    }

    async FindByID(id: string): Promise<ResTodoDTO> {
        const res = await fetch(
            `${this.baseURL}/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.jwt}`
                } 
            }
        );

        if(!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at FindByID")
        }

        const todo: ResTodoDTO = await res.json();
        return todo
    }

    async Update(id: string, input: ReqUpdateDTO): Promise<void> {
        const res = await fetch(
            `${this.baseURL}/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.jwt}`
                },
                body: JSON.stringify(input)
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Update")
        }
    }

    async Delete(id: string): Promise<void> {
        const res = await fetch(
            `${this.baseURL}/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.jwt}`
                }
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Delete")
        }
    }
}