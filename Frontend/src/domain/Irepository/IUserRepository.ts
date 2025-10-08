import type { ReqSignINDTO, ReqEditDTO, ResTokenDTO } from "../dto/userDTO/index";

export interface IUserRepository {
    Create(input: ReqSignINDTO): Promise<ResTokenDTO>;
    FindByEmail(input: ReqSignINDTO): Promise<ResTokenDTO>;
    Update(input: ReqEditDTO): Promise<ResTokenDTO>;
    Delete(input: ReqSignINDTO): Promise<void>;
}