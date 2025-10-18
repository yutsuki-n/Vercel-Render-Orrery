export class DueDate {
    private readonly value: Date | null
    private constructor(input:  Date | null ) {
            this.value= input
    }

    static NewDueDate(future: Date | null): DueDate {
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        
        if (future && future <= yesterday) {
            throw new Error("期日は現在以降の日付にしてください")
        } else {
            return new DueDate(future)
        }
    }

    static FromExisting(date: Date | null): DueDate {
        return new DueDate(date)
    }

    Value() {
        return this.value
    }
}