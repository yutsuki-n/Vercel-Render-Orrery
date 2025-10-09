// Package valueobject define roles of input
package valueobject

import (
	"fmt"
	"unicode/utf8"
)

type Body struct {
	body string
}

const maxbody = 1000

func NewBody(input *string) (Body, error) {
	if utf8.RuneCountInString(*input) > maxbody {
		return Body{}, fmt.Errorf("bodyは%d字以下にしてください", maxbody)
	}

	return Body{body: *input}, nil
}

func (b Body) Value() string {
	return b.body
}
