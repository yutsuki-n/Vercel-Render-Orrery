export class CompletedAt {
    private readonly value: Date | null
    constructor(input:  Date | null ) {
        if (!input || input <= new Date()) {
            this.value = input
        } else {
            throw new Error("完了日は過去の日付にしてください")
        }
    }

    Value() {
        return this.value
    }
}