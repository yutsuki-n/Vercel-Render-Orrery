package valueobject

import (
	"fmt"
	"unicode/utf8"
)

type Title struct {
	title string
}

const maxtitle = 50

func NewTitle(input string) (Title, error) {
	if utf8.RuneCountInString(input) > maxtitle {
		return Title{}, fmt.Errorf("タイトルは%d字以下にしてください", maxtitle)
	}

	if input == "" {
		return Title{}, fmt.Errorf("タイトルは必須です")
	}

	return Title{title: input}, nil
}

func (t Title) Value() string {
	return t.title
}
