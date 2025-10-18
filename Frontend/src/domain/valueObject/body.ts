export class Body {
    private readonly value: string | null;
    constructor(input: string | null) {
        Body.validation(input);
        this.value = input; 
   }

    Value() {
        return this.value
    }

    static validation(input: string | null) {
         if (input && [...input].length > 1000) {
            throw new Error("Aboutは1000文字以下にしてください")
        }
    }
}