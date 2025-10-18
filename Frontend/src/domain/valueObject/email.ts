export class Email {
    private readonly value: string 
    constructor(input: string) {
       Email.validation(input);
       this.value = input 
    }

    Value() {
        return this.value
    }

    static validation(input: string) {
        const mail = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!mail.test(input)) {
            throw new Error("メールアドレスを入力してください")
        }
    }
}