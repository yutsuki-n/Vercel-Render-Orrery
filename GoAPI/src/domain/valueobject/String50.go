package valueobject

import (
	"fmt"
	"unicode/utf8"
)

type String50 struct {
	title string
}

const maxtitle = 50

func NewString50(input string) (String50, error) {
	if utf8.RuneCountInString(input) > maxtitle {
		return String50{}, fmt.Errorf("%d字以下にしてください", maxtitle)
	}

	if input == "" {
		return String50{}, fmt.Errorf("必須です")
	}

	return String50{title: input}, nil
}

func (t String50) Value() string {
	return t.title
}
