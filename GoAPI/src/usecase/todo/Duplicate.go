package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
	"time"
)

type DuplicateTodo struct {
	todoRepo repository.ITodoRepository
}

func NewDuplicateTodo(todoRepo repository.ITodoRepository) *DuplicateTodo {
	return &DuplicateTodo{
		todoRepo: todoRepo,
	}
}

func (dpt *DuplicateTodo) Execute(todoID valueobject.TodoID, userID valueobject.UserID) (*entity.Todo, error) {
	todo, err := dpt.todoRepo.FindByID(todoID)
	if err != nil {
		return nil, fmt.Errorf("todoの検索に失敗:%w", err)
	}

	if todo.UserID() != userID {
		return nil, fmt.Errorf("権限がありません")
	}

	title := todo.Title().Value() + "のコピー"
	titleVO, err := valueobject.NewString50(title)
	if err != nil {
		return nil, err
	}

	duplicatingTodo := entity.NewTodo(
		valueobject.NewTodoID(),
		todo.UserID(),
		titleVO,
		todo.Body(),
		nil, //reset dueDate
		nil, //reset completedAt
		time.Now(),
		time.Now(),
	)

	duplicatedTodo, err := dpt.todoRepo.Create(&duplicatingTodo)
	if err != nil {
		return nil, fmt.Errorf("複製に失敗:%w", err)
	}
	return duplicatedTodo, nil
}
