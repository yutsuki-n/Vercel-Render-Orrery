// Package repository have databasal function
package repository

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/valueobject"
	"time"
)

type ITodoRepository interface {
	Create(todo *entity.Todo) (*entity.Todo, error)
	Update(todo *entity.Todo) (*entity.Todo, error)
	FindByID(todoID valueobject.TodoID) (*entity.Todo, error)
	FindByUserIDWithFilters(input ListTodoInput) (*[]entity.Todo, error)
	Delete(todoID valueobject.TodoID) error
}

type ListTodoInput struct {
	UserID      valueobject.UserID
	Title       *valueobject.String50
	Body        *valueobject.String1000
	DueDateFrom *time.Time
	DueDateTo   *time.Time
	Completed   *bool
}
