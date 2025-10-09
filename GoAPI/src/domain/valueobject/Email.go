package valueobject

import (
	"fmt"
	"regexp"
)

type Email struct {
	email string
}

func NewEmail(input string) (Email, error) {
	pattern := `^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	r := regexp.MustCompile(pattern)
	if !r.MatchString(input) {
		fmt.Printf("email:%sは適切ではありません\n", input)
		return Email{}, fmt.Errorf("Emailの形式が不正です")
	}
	return Email{email: input}, nil
}

func (e Email) Value() string {
	return e.email
}
