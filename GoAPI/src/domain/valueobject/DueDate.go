package valueobject

import (
	"fmt"
	"time"
)

type DueDate struct {
	dueDate time.Time
}

func NewDueDate(input *time.Time) (DueDate, error) {
	if input.Before(time.Now()) {
		return DueDate{}, fmt.Errorf("過去の日時は入力できません")
	}
	return DueDate{dueDate: *input}, nil
}

func ExistingDueDate(input *time.Time) DueDate {
	return DueDate{dueDate: *input}
}

func (d DueDate) Value() time.Time {
	return d.dueDate
}
