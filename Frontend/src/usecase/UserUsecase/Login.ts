import type { User } from "@/domain/entity/user";
import type { ReqSignINDTO } from "../../domain/dto/userDTO";
import type { IUserRepository } from "../../domain/Irepository/IUserRepository";


export class LoginUsecase {
    private readonly userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    async Execute(user: User): Promise<string> {
        const loginInput: ReqSignINDTO = {
            email: user.Email.Value(),
            raw_password: user.RawPassword.Value()
        }

        const Token = await this.userRepo.FindByEmail(loginInput)

        return Token.token
    }
}