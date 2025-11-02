import { Email, RawPassword } from "../valueObject"

export class User {
    private email: Email
    private rawPassword: RawPassword

    constructor(
        email: string,
        rawPassword: string,
    ) {
        this.email = new Email(email);
        this.rawPassword = new RawPassword(rawPassword);
    }

    public get Email(): Email {
        return this.email
    }

    public get RawPassword(): RawPassword {
        return this.rawPassword
    }

    static getToken = () => {
        return localStorage.getItem("token");
    }
}