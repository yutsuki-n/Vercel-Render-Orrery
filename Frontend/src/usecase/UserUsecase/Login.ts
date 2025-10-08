import type { ReqSignINDTO } from "../../domain/dto/userDTO";
import type { IUserRepository } from "../../domain/Irepository/IUserRepository";
import type { Email, RawPassword } from "../../domain/valueObject";


export class LoginUsecase {
    private readonly userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    async Execute(email: Email, rawPassword: RawPassword): Promise<string> {
        const loginInput: ReqSignINDTO = {
            email: email.Value(),
            rawPassword: rawPassword.Value()
        }

        const Token = await this.userRepo.FindByEmail(loginInput)

        return Token.token
    }
}