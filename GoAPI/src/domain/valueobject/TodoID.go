package valueobject

import (
	"fmt"

	"github.com/lucsky/cuid"
)

type TodoID struct {
	todoID string
}

func NewTodoID() TodoID {
	return TodoID{todoID: cuid.New()}
}

func FromStringTodoID(input string) (TodoID, error) {
	if input == "" {
		return TodoID{}, fmt.Errorf("todoIDは必須です")
	}

	return TodoID{todoID: input}, nil
}

func (t TodoID) Value() string {
	return t.todoID
}
