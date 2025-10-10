package valueobject

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type RawPassword struct {
	rawPassword string
}

const minPassword = 8

func NewRawPassword(input string) (RawPassword, error) {
	fmt.Println("これが入力パス", input)
	if len(input) < minPassword {
		return RawPassword{}, fmt.Errorf("パスワードは%d文字以上にしてくださaい", minPassword)
	}

	return RawPassword{rawPassword: input}, nil
}

func (r RawPassword) Value() string {
	return r.rawPassword
}

type HashedPassword struct {
	hashedPassword string
}

func HashPassword(rawPassword RawPassword) (HashedPassword, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(rawPassword.Value()), bcrypt.DefaultCost)
	if err != nil {
		return HashedPassword{}, fmt.Errorf("パスワードの作成に失敗しました")
	}

	return HashedPassword{hashedPassword: string(hashedPassword)}, nil
}

func FromStringHashedPassword(hashedpassword string) (HashedPassword, error) {
	if hashedpassword == "" {
		return HashedPassword{}, fmt.Errorf("無効な入力")
	}

	return HashedPassword{hashedPassword: hashedpassword}, nil
}

func (h HashedPassword) Value() string {
	return h.hashedPassword
}

func (h HashedPassword) Compare(rawPassword RawPassword) error {
	err := bcrypt.CompareHashAndPassword([]byte(h.hashedPassword), []byte(rawPassword.Value()))
	return err
}
