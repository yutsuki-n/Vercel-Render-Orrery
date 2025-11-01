// Package valueobject define roles of input
package valueobject

import (
	"fmt"
	"unicode/utf8"
)

type String1000 struct {
	body string
}

const maxbody = 1000

func NewString1000(input *string) (String1000, error) {
	if utf8.RuneCountInString(*input) > maxbody {
		return String1000{}, fmt.Errorf("%d字以下にしてください", maxbody)
	}

	return String1000{body: *input}, nil
}

func (b String1000) Value() string {
	return b.body
}
