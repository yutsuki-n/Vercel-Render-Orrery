package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
)

type ToggleTodo struct {
	todoRepo repository.ITodoRepository
}

func NewToggleTodo(todoRepo repository.ITodoRepository) *ToggleTodo {
	return &ToggleTodo{
		todoRepo: todoRepo,
	}
}

func (tg ToggleTodo) Execute(todoID valueobject.TodoID, userID valueobject.UserID) (*entity.Todo, error) {
	todo, err := tg.todoRepo.FindByID(todoID)
	if err != nil {
		return nil, fmt.Errorf("todo検索エラー:%w", err)
	}
	if todo.UserID() != userID {
		return nil, fmt.Errorf("権限がありません")
	}

	todo.Toggle()

	toggledTodo, err := tg.todoRepo.Update(todo)
	if err != nil {
		return nil, fmt.Errorf("システムエラー:%w", err)
	}
	return toggledTodo, nil
}
