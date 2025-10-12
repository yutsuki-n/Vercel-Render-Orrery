import type { ReqEditDTO, ReqSignINDTO, ResTokenDTO } from "../domain/dto/userDTO";
import type { IUserRepository } from "../domain/Irepository/IUserRepository";


export class UserFetch implements IUserRepository {
    private Token: string | undefined;
    // private baseURL: string = "http://localhost:8080"
    private baseURL = "https://orrery-fulb.onrender.com/todos";
    constructor(token: string | null) {
        if (token) {
            this.Token = token
        } else {
            this.Token = undefined
        }
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
        return token
    }

    async FindByEmail(input: ReqSignINDTO): Promise<ResTokenDTO> {
        console.log(input, JSON.stringify(input))
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
        return token
    }

    async Update(input: ReqEditDTO): Promise<ResTokenDTO> {
        console.log("from fetch, token", this.Token)
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
        return token;
    }

    async Delete(input: ReqSignINDTO): Promise<void> {
        console.log("from fetch", JSON.stringify(input));
        const res = await fetch(
            `${this.baseURL}/users/withdraw`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.Token}`
                },
                body: JSON.stringify(input)
            }
       );
       console.log("finished fetch") 

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "不明なエラー at Delete")
        }
    }
}