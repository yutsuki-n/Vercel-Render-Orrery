export class RawPassword {
    private readonly value: string 
    constructor(input: string) {
       RawPassword.validation(input);
       this.value = input; 
    }

    Value() {
        return this.value
    }

    static validation(input: string) {
        if (input.length < 8) {
            throw new Error("パスワードは8文字以上にしてください")
        }
    }
}