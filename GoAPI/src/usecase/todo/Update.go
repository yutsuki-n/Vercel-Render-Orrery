package todo

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
	"time"
)

type UpdateTodo struct {
	todoRepo repository.ITodoRepository
}

func NewUpdateTodo(todoRepo repository.ITodoRepository) *UpdateTodo {
	return &UpdateTodo{
		todoRepo: todoRepo,
	}
}

func (ut *UpdateTodo) Execute(input valueobject.UpdateTodoInput) (*entity.Todo, error) {
	todo, err := ut.todoRepo.FindByID(input.TodoID)
	if err != nil {
		return nil, fmt.Errorf("todoの取得に失敗しました")
	}
	fmt.Println("アップデートユースケース最初のfoundtodo", todo)

	if input.UserID != todo.UserID() {
		return nil, fmt.Errorf("権限がありません")
	}

	if input.Title != nil {
		todo.SetTitle(input.Title)
	}
	fmt.Println("ボディ検閲", input.Body)
	if input.Body != nil && input.Body.Value() == "" {
		todo.SetBody(nil)
	} else if input.Body != nil {
		todo.SetBody(input.Body)
	}
	fmt.Println("ボディのヌル除外OK,duedateについて、input.DueDate != nil", input.DueDate != nil)

	maxTime, _ := time.Parse("2006-01-02", "9999-12-31")
	if input.DueDate != nil && time.Time.Equal(input.DueDate.Value(), maxTime) {
		todo.SetDueDate(nil)
	} else if input.DueDate != nil {
		todo.SetDueDate(input.DueDate)
	}

	minTime, _ := time.Parse("2006-01-02", "0001-01-01")
	if input.CompletedAt != nil && time.Time.Equal(input.CompletedAt.Value(), minTime) {
		todo.SetCompletedAt(nil)
	} else if input.CompletedAt != nil {
		todo.SetCompletedAt(input.CompletedAt)
	}
	fmt.Println("アップデートユースケース更新後todo", todo)
	updatedTodo, err := ut.todoRepo.Update(todo)
	if err != nil {
		return nil, fmt.Errorf("更新に失敗しました")
	}
	return updatedTodo, nil
}
