export type ReqCreateDTO = {
    readonly title: string;
    readonly body?: string;
    readonly due_date?: string;
}

export type ReqListDTO = {
    readonly title?: string;
    readonly body?: string;
    readonly due_date_from?: string;
    readonly due_date_to?: string;
}

export type ReqUpdateDTO = {
    readonly title?: string;
    readonly body?: string | null;
    readonly due_date?: string | null;
    readonly completed_at?: string | null;
}