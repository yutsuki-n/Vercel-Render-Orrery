package user

import (
	auth "GoAPI/src/domain/authorization"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type LoginUser struct {
	userRepo   repository.IUserRepository
	authClient auth.IAuthClient
}

func NewLoginUser(userRepo repository.IUserRepository, authClient auth.IAuthClient) *LoginUser {
	return &LoginUser{
		userRepo:   userRepo,
		authClient: authClient,
	}
}

func (lu LoginUser) Execute(input valueobject.SignInput) (string, error) {
	user, err := lu.userRepo.FindByEmail(input.Email)
	if err != nil {
		return "", fmt.Errorf("ユーザー検索に失敗:%w", err)
	}
	if user == nil {
		return "", fmt.Errorf("ユーザーが登録されていません")
	}

	compareErr := user.HashedPassword().Compare(input.RawPassword)

	if errors.Is(compareErr, bcrypt.ErrMismatchedHashAndPassword) {
		return "", fmt.Errorf("パスワードが違います")
	} else if compareErr != nil {
		return "", fmt.Errorf("パスワードの照合に失敗しました: %w", err)
	}

	token, err := lu.authClient.CreateToken(user.UserID().Value())

	if err != nil {
		return "", fmt.Errorf("トークン発行に失敗しました:%w", err)
	}

	return token, nil
}
