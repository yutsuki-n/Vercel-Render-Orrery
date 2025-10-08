import type { ReqEditDTO, ReqSignINDTO, ResTokenDTO } from "../domain/dto/userDTO";
import type { IUserRepository } from "../domain/Irepository/IUserRepository";


export class UserFetch implements IUserRepository {
    private Token: string | undefined;
    private baseURL: string = "http://localhost:8080"
    constructor() {
        this.Token = undefined
    }
    
    getToken(): string | undefined {
        return this.Token;
    }

    async Create(input: ReqSignINDTO): Promise<ResTokenDTO> {
        const res = await fetch(
            `${this.baseURL}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Register")
        }

        const token: ResTokenDTO = await res.json();
        this.Token = token.token
        localStorage.setItem("token", this.Token);
        return token
    }

    async FindByEmail(input: ReqSignINDTO): Promise<ResTokenDTO> {
        const res = await fetch(
            `${this.baseURL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
       );
            
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Login")
        }
 
        const token: ResTokenDTO = await res.json();
        this.Token = token.token;
        localStorage.setItem("token", this.Token);
        return token
    }

    async Update(input: ReqEditDTO): Promise<ResTokenDTO> {
        const res = await fetch(
            `${this.baseURL}/users/reset`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.Token}`
                },
                body: JSON.stringify(input)
            }
       );
            
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Update")
        }
        
        const token: ResTokenDTO = await res.json();
        this.Token = token.token;
        localStorage.setItem("token", this.Token);
        return token;
    }

    async Delete(input: ReqSignINDTO): Promise<void> {
        const res = await fetch(
            `${this.baseURL}/users/withdraw`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.Token}`
                },
                body: JSON.stringify(input)
            }
       );
            
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Delete")
        }
    }
}