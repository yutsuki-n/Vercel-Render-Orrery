
export class CompletedAt {
    private readonly value: Date | null
    constructor(input:  Date | null ) {
       console.log("completedAtの登録ミス");
       CompletedAt.validation(input);
       this.value = input  
    }

    Value() {
        return this.value
    }

    static validation(input: Date | null) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (input && input >= tomorrow) {
            throw new Error(`完了日は過去の日付にしてください ps 表示はこれで入力は${input}`)
        }
    }
}