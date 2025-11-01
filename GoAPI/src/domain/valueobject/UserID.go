package valueobject

import (
	"fmt"

	"github.com/lucsky/cuid"
)

type UserID struct {
	userID string
}

func NewUserID() UserID {
	return UserID{userID: cuid.New()}
}

func FromStringUserID(input string) (UserID, error) {
	if input == "" {
		return UserID{}, fmt.Errorf("userIDは1文字以上です")
	}

	return UserID{userID: input}, nil
}

func (u UserID) Value() string {
	return u.userID
}

type SignInput struct {
	Email       Email
	RawPassword RawPassword
}

type ResetInput struct {
	UserID         UserID
	OldEmail       Email
	OldRawPassword RawPassword
	NewEmail       *Email
	NewRawPassword *RawPassword
}
