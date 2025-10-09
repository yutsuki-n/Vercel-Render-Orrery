package entity

import (
	"GoAPI/src/domain/valueobject"
	"time"
)

type Todo struct {
	todoID      valueobject.TodoID
	userID      valueobject.UserID
	title       valueobject.Title
	body        *valueobject.Body
	dueDate     *valueobject.DueDate
	completedAt *valueobject.CompletedAt
	createdAt   time.Time
	updatedAt   time.Time
}

func NewTodo(
	todoID valueobject.TodoID,
	userID valueobject.UserID,
	title valueobject.Title,
	body *valueobject.Body,
	dueDate *valueobject.DueDate,
	completedAt *valueobject.CompletedAt,
	createdAt time.Time,
	updatedAt time.Time,
) Todo {
	return Todo{
		todoID:      todoID,
		userID:      userID,
		title:       title,
		body:        body,
		dueDate:     dueDate,
		completedAt: completedAt,
		createdAt:   createdAt,
		updatedAt:   updatedAt,
	}
}

func (t *Todo) TodoID() valueobject.TodoID {
	return t.todoID
}

func (t *Todo) UserID() valueobject.UserID {
	return t.userID
}

func (t *Todo) Title() valueobject.Title {
	return t.title
}

func (t *Todo) Body() *valueobject.Body {
	return t.body
}

func (t *Todo) DueDate() *valueobject.DueDate {
	return t.dueDate
}

func (t *Todo) CompletedAt() *valueobject.CompletedAt {
	return t.completedAt
}

func (t *Todo) CreatedAt() time.Time {
	return t.createdAt
}

func (t *Todo) UpdatedAt() time.Time {
	return t.updatedAt
}

func (t *Todo) SetTitle(title *valueobject.Title) {
	t.title = *title
}

func (t *Todo) SetBody(body *valueobject.Body) {
	t.body = body
}

func (t *Todo) SetDueDate(dueDate *valueobject.DueDate) {
	t.dueDate = dueDate
}

func (t *Todo) SetCompletedAt(completedAt *valueobject.CompletedAt) {
	t.completedAt = completedAt
}
