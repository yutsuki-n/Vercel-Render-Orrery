export class Email {
    private readonly value: string 
    constructor(input: string) {
        const mail = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (mail.test(input)) {
            this.value = input 
        } else {
            throw new Error("メールアドレスを入力してください")
        }
    }

    Value() {
        return this.value
    }
}