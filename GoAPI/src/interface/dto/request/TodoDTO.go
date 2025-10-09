// Package request is DTO of URL input
package request

type CreateTodoDTO struct {
	Title   string  `json:"title" validate:"required"`
	Body    *string `json:"body"`
	DueDate *string `json:"due_date"`
}

type ListTodoDTO struct {
	Title       *string `json:"title" query:"title"`
	Body        *string `json:"body" query:"body"`
	DueDateFrom *string `json:"due_date_from" query:"due_date_from"`
	DueDateTo   *string `json:"due_date_to" query:"due_date_to"`
	Completed   *string `json:"completed" query:"completed"`
}

type UpdateTodoDTO struct {
	Title       *string `json:"title" query:"title"`
	Body        *string `json:"body" query:"body"`
	DueDate     *string `json:"due_date" query:"due_date"`
	CompletedAt *string `json:"completed_at" query:"completed_at"`
}
