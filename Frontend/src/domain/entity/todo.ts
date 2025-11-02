import { Body, CompletedAt, DueDate, Title } from "../valueObject";

export class Todo {
    private todoID: string
    private userID: string
    private title: Title
    private body: Body | null
    private dueDate: DueDate | null
    private completedAt: CompletedAt | null
    private createdAt: Date
    private updatedAt: Date

    constructor(
        todoID: string,
        userID: string,
        title: string,
        body: string | null,
        dueDate: string | null,
        completedAt: string | null,
        createdAt: string,
        updatedAt: string,
    ) {
        this.todoID = todoID;
        this.userID = userID;
        this.title = new Title(title);
        this.body = new Body(body);
        this.dueDate = dueDate ? DueDate.FromExisting(new Date(dueDate)) : null;
        this.completedAt= completedAt? new CompletedAt(new Date(completedAt)) : null;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }

    public get TodoID(): string {
        return this.todoID;
    };

    public get UserID(): string {
        return this.userID
    }

    public get Title(): Title {
        return this.title
    }

    public get Body(): Body | null{
        return this.body
    }

    public get DueDate(): DueDate | null{
        return this.dueDate
    }

    public get CompletedAt(): CompletedAt | null{
        return this.completedAt
    }

    public get CreatedAt(): Date {
        return this.createdAt
    }

    public get UpdatedAt(): Date {
        return this.updatedAt
    }
}