export class RawPassword {
    private readonly value: string 
    constructor(input: string) {
        if (input.length >= 8) {
            this.value = input
        } else {
            throw new Error("パスワードは8文字以上にしてください")
        }
    }

    Value() {
        return this.value
    }
}