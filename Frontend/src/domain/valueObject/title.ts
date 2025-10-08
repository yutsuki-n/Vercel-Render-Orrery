
export class Title {
    private readonly value: string
    constructor(input: string) {
        if ([...input].length > 50) {
            this.value = input
        } else {
            throw new Error("50文字以下にしてください")
        }
    }

    Value() {
        return this.value
    }
}