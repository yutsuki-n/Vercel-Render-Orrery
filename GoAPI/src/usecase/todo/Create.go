// Package todo handle databasal function
package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
	"time"
)

type CreateTodo struct {
	todoRepo repository.ITodoRepository
}

func NewCreateTodo(todoRepo repository.ITodoRepository) *CreateTodo {
	return &CreateTodo{
		todoRepo: todoRepo,
	}
}

type CreateTodoInput struct {
	UserID  valueobject.UserID
	Title   valueobject.String50
	Body    *valueobject.String1000
	DueDate *time.Time
}

func (ct CreateTodo) Execute(input CreateTodoInput) (*entity.Todo, error) {
	todo := entity.NewTodo(
		valueobject.NewTodoID(),
		input.UserID,
		input.Title,
		input.Body,
		input.DueDate,
		nil,
		time.Now(),
		time.Now(),
	)
	fmt.Println("hello from usecase todo", todo)

	savedTodo, err := ct.todoRepo.Create(&todo)
	if err != nil {
		return &entity.Todo{}, fmt.Errorf("todoの作成に失敗しました")
	}

	fmt.Println("savedTodo", savedTodo)
	return savedTodo, nil
}
