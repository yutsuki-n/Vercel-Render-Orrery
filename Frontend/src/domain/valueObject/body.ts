export class Body {
    private readonly value: string | null;
    constructor(input: string | null) {
        if (!input || [...input].length <= 1000) {
            this.value = input
        } else {
            throw new Error("1000文字以下にしてください")
        }
    }

    Value() {
        return this.value
    }
}