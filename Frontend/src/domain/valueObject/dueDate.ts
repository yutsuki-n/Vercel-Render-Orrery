export class DueDate {
    private readonly value: Date | null
    constructor(input:  Date | null ) {
        if (!input || input < new Date()) {
            this.value= input
        } else {
            throw new Error("期日は未来の日程にしてください")
        }
    }

    Value() {
        return this.value
    }
}