export class CompletedAt {
    private readonly value: Date | null
    constructor(input:  Date | null ) {
       CompletedAt.validation(input);
       this.value = input  
    }

    Value() {
        return this.value
    }

    static validation(input: Date | null) {
         if (input && input > new Date()) {
            throw new Error("完了日は過去の日付にしてください")
        }
    }
}