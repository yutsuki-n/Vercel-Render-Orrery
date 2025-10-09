// Package response is DTO of response
package response

import "time"

type TodoDTO struct {
	TodoID      string     `json:"todo_id" validate:"required"`
	UserID      string     `json:"user_id" validate:"required"`
	Title       string     `json:"title" validate:"required"`
	Body        *string    `json:"body"`
	DueDate     *time.Time `json:"due_date"`
	CompletedAt *time.Time `json:"completed_at"`
	CreatedAt   time.Time  `json:"created_at" validate:"required"`
	UpdatedAt   time.Time  `json:"updated_at" validate:"required"`
}
