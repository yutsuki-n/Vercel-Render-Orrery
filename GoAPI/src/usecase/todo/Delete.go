package todo

import (
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
)

type DeleteTodo struct {
	todoRepo repository.ITodoRepository
}

func NewDeleteTodo(todoRepo repository.ITodoRepository) *DeleteTodo {
	return &DeleteTodo{
		todoRepo: todoRepo,
	}
}

func (dt *DeleteTodo) Execute(todoID valueobject.TodoID, userID valueobject.UserID) error {
	todo, err := dt.todoRepo.FindByID(todoID)
	if err != nil {
		return fmt.Errorf("todoの検索に失敗しました: %w", err)
	}

	if userID != todo.UserID() {
		return fmt.Errorf("権限がありません")
	}

	if err := dt.todoRepo.Delete(todoID); err != nil {
		return fmt.Errorf("Deleteに失敗しました:%w", err)
	}
	return nil
}
