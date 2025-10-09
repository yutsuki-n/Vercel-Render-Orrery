package valueobject

import "time"

type ListTodoInput struct {
	UserID      UserID
	Title       *Title
	Body        *Body
	DueDateFrom *time.Time
	DueDateTo   *time.Time
	Completed   *bool
}

type CreateTodoInput struct {
	UserID  UserID
	Title   Title
	Body    *Body
	DueDate *DueDate
}

type UpdateTodoInput struct {
	TodoID      TodoID
	UserID      UserID
	Title       *Title
	Body        *Body
	DueDate     *DueDate
	CompletedAt *CompletedAt
}
