import type { IUserRepository } from "../../domain/Irepository/IUserRepository";
import type { ReqSignINDTO } from "../../domain/dto/userDTO";
import type { User } from "@/domain/entity/user";


export class WithdrawUsecase {
    private readonly userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async Execute(user: User): Promise<void> {
        const withdrawInput: ReqSignINDTO = {
            email: user.Email.Value(),
            raw_password: user.RawPassword.Value(),
        }
        await this.userRepo.Delete(withdrawInput)
    }
}