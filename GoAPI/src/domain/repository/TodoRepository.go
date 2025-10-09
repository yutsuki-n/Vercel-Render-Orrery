// Package repository have databasal function
package repository

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/valueobject"
)

type ITodoRepository interface {
	Create(todo *entity.Todo) (*entity.Todo, error)
	Update(todo *entity.Todo) (*entity.Todo, error)
	FindByID(todoID valueobject.TodoID) (*entity.Todo, error)
	FindByUserIDWithFilters(input valueobject.ListTodoInput) (*[]entity.Todo, error)
	Delete(todoID valueobject.TodoID) error
}
