package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"fmt"
)

type ListTodo struct {
	todoRepo repository.ITodoRepository
}

func NewListTodo(todoRepo repository.ITodoRepository) *ListTodo {
	return &ListTodo{
		todoRepo: todoRepo,
	}
}

func (lt *ListTodo) Execute(input repository.ListTodoInput) (*[]entity.Todo, error) {
	todos, err := lt.todoRepo.FindByUserIDWithFilters(input)
	if err != nil {
		return nil, fmt.Errorf("検索エラー:%w", err)
	}
	return todos, nil
}
