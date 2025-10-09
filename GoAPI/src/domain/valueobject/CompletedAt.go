package valueobject

import (
	"fmt"
	"time"
)

type CompletedAt struct {
	completedAt time.Time
}

func NewCompletedAt(input *time.Time) (CompletedAt, error) {
	if input.After(time.Now()) {
		return CompletedAt{}, fmt.Errorf("未来の日時は入力できません")
	}

	return CompletedAt{completedAt: *input}, nil
}

func (c CompletedAt) Value() time.Time {
	return c.completedAt
}
