package entity

import (
	"GoAPI/src/domain/valueobject"
	"time"
)

type Todo struct {
	todoID valueobject.TodoID
	userID valueobject.UserID
	title  valueobject.String50
	body   *valueobject.String1000
	// dueDate     *valueobject.DueDate
	// completedAt *valueobject.CompletedAt
	dueDate     *time.Time
	completedAt *time.Time
	createdAt   time.Time
	updatedAt   time.Time
}

func NewTodo(
	todoID valueobject.TodoID,
	userID valueobject.UserID,
	title valueobject.String50,
	body *valueobject.String1000,
	dueDate *time.Time,
	completedAt *time.Time,
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

func (t *Todo) Title() valueobject.String50 {
	return t.title
}

func (t *Todo) Body() *valueobject.String1000 {
	return t.body
}

func (t *Todo) DueDate() *time.Time {
	return t.dueDate
}

func (t *Todo) CompletedAt() *time.Time {
	return t.completedAt
}

func (t *Todo) CreatedAt() time.Time {
	return t.createdAt
}

func (t *Todo) UpdatedAt() time.Time {
	return t.updatedAt
}

func (t *Todo) SetTitle(title *valueobject.String50) {
	t.title = *title
}

func (t *Todo) SetBody(body *valueobject.String1000) {
	t.body = body
}

func (t *Todo) SetDueDate(dueDate *time.Time) {
	t.dueDate = dueDate
}

func (t *Todo) SetCompletedAt(completedAt *time.Time) {
	t.completedAt = completedAt
}

func (t *Todo) Toggle() {
	if t.CompletedAt() == nil {
		now := time.Now()
		t.SetCompletedAt(&now)
	} else {
		t.SetCompletedAt(nil)
	}
}

type UpdateTodoInput struct {
	TodoID      valueobject.TodoID
	UserID      valueobject.UserID
	Title       *valueobject.String50
	Body        *valueobject.String1000
	DueDate     *time.Time
	CompletedAt *time.Time
}

func (t *Todo) Update(input UpdateTodoInput) {
	if input.Title != nil {
		t.SetTitle(input.Title)
	}
	if input.Body != nil && input.Body.Value() == "" {
		t.SetBody(nil)
	} else if input.Body != nil {
		t.SetBody(input.Body)
	}

	maxTime, _ := time.Parse("2006-01-02", "9999-12-31")
	if input.DueDate != nil && time.Time.Equal(*input.DueDate, maxTime) {
		t.SetDueDate(nil)
	} else if input.DueDate != nil {
		t.SetDueDate(input.DueDate)
	}

	minTime, _ := time.Parse("2006-01-02", "0001-01-01")
	if input.CompletedAt != nil && time.Time.Equal(*input.CompletedAt, minTime) {
		t.SetCompletedAt(nil)
	} else if input.CompletedAt != nil {
		t.SetCompletedAt(input.CompletedAt)
	}
}
