export type ReqSignINDTO = {
    readonly email: string;
    readonly rawPassword: string;
}

export type ReqEditDTO = {
    readonly oldEmail: string;
    readonly oldRawPassword: string;
    readonly newEmail?: string;
    readonly newRawPassword?: string;
}