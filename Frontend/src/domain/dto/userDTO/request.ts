export type ReqSignINDTO = {
    readonly email: string;
    readonly raw_password: string;
}

export type ReqEditDTO = {
    readonly old_email: string;
    readonly old_raw_password: string;
    readonly new_email?: string;
    readonly new_raw_password?: string;
}