import type { ReqEditDTO } from "../../domain/dto/userDTO";
import type { IUserRepository } from "../../domain/Irepository/IUserRepository";
import type { Email, RawPassword } from "../../domain/valueObject";


export class EditUsecase {
    private readonly userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    async Execute(oldEmail: Email, 
                  oldRawPassword: RawPassword,
                  newEmail?: Email,
                  newRawPassword?: RawPassword): Promise<string> 
    {
        const editInput: ReqEditDTO = {
            old_email: oldEmail.Value(),
            old_raw_password: oldRawPassword.Value(),
            new_email: newEmail?.Value(),
            new_raw_password: newRawPassword?.Value()
        }

        const Token = await this.userRepo.Update(editInput)

        return Token.token
    }
}