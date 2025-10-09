package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
)

type GetTodo struct {
	todoRepo repository.ITodoRepository
}

func NewGetTodo(todoRepo repository.ITodoRepository) *GetTodo {
	return &GetTodo{
		todoRepo: todoRepo,
	}
}

func (gt *GetTodo) Execute(todoID valueobject.TodoID, userID valueobject.UserID) (*entity.Todo, error) {
	todo, err := gt.todoRepo.FindByID(todoID)
	if err != nil {
		return nil, fmt.Errorf("todo検索エラー:%w", err)
	}
	if todo.UserID() != userID {
		return nil, fmt.Errorf("権限がありません")
	}

	return todo, nil
}
