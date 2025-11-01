package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"fmt"
)

type UpdateTodo struct {
	todoRepo repository.ITodoRepository
}

func NewUpdateTodo(todoRepo repository.ITodoRepository) *UpdateTodo {
	return &UpdateTodo{
		todoRepo: todoRepo,
	}
}

func (ut *UpdateTodo) Execute(input entity.UpdateTodoInput) (*entity.Todo, error) {
	todo, err := ut.todoRepo.FindByID(input.TodoID)
	if err != nil {
		return nil, fmt.Errorf("todoの取得に失敗しました")
	}

	if input.UserID != todo.UserID() {
		return nil, fmt.Errorf("権限がありません")
	}

	todo.Update(input)

	updatedTodo, err := ut.todoRepo.Update(todo)
	if err != nil {
		return nil, fmt.Errorf("更新に失敗しました")
	}
	return updatedTodo, nil
}
