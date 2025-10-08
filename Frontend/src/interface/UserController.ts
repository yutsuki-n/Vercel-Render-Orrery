import { Email, RawPassword } from "../domain/valueObject";
import { UserFetch } from "../infrastructure/UserFetch";
import { EditUsecase } from "../usecase/UserUsecase/Edit";
import { LoginUsecase } from "../usecase/UserUsecase/Login";
import { RegisterUsecase } from "../usecase/UserUsecase/Register";
import { WithdrawUsecase } from "../usecase/UserUsecase/Withdraw";


const UF = new UserFetch();

export const Register = async (email: string, rawPassword: string): Promise<string> => {
    const usecase = new RegisterUsecase(UF);
    const inputEmail = new Email(email);
    const inputRawPassword = new RawPassword(rawPassword);

    const token = await usecase.Execute(inputEmail, inputRawPassword);
    return token;
}

export const Login = async (email: string, rawPassword: string): Promise<string> => {
    const usecase = new LoginUsecase(UF);
    const inputEmail = new Email(email);
    const inputRawPassword = new RawPassword(rawPassword);

    const token = await usecase.Execute(inputEmail, inputRawPassword);
    return token;
}

export const Edit = async (oldEmail: string, oldRawPassword: string, newEmail?: string, newRawPassword?: string): Promise<string> => {
    const usecase = new EditUsecase(UF);
    const inputOldEmail = new Email(oldEmail);
    const inputOldRawPassword = new RawPassword(oldRawPassword);
    const inputNewEmail = newEmail ? new Email(newEmail) : undefined;
    const inputNewRawPassword = newRawPassword ? new RawPassword(newRawPassword) : undefined;

    const token = await usecase.Execute(inputOldEmail, inputOldRawPassword, inputNewEmail, inputNewRawPassword);
    return token;
}

export const Delete = async (email: string, rawPassword: string): Promise<void> => {
    const usecase = new WithdrawUsecase(UF);
    const inputEmail = new Email(email);
    const inputRawPassword = new RawPassword(rawPassword);

    await usecase.Execute(inputEmail, inputRawPassword);

}