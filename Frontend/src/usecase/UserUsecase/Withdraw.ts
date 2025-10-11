import type { IUserRepository } from "../../domain/Irepository/IUserRepository";
import type { Email, RawPassword } from "../../domain/valueObject";
import type { ReqSignINDTO } from "../../domain/dto/userDTO";


export class WithdrawUsecase {
    private readonly userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async Execute(email: Email, rawPassword: RawPassword): Promise<void> {
        const withdrawInput: ReqSignINDTO = {
            email: email.Value(),
            raw_password: rawPassword.Value()
        }
        console.log("from usecase", email, rawPassword)
        await this.userRepo.Delete(withdrawInput)
    }
}