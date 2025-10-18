
export class Title {
    private readonly value: string
    constructor(input: string) {
        Title.validation(input);
        this.value = input
    }

    Value() {
        return this.value
    }

    static validation(input: string) {
        if ([...input].length > 50) {
            throw new Error("タイトルは50字以内にしてください")
        }
    }
}