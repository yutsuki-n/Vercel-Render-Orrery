package user

import (
	auth "GoAPI/src/domain/authorization"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type ResetUser struct {
	userRepo   repository.IUserRepository
	authClient auth.IAuthClient
}

func NewResetUser(userRepo repository.IUserRepository, authClient auth.IAuthClient) *ResetUser {
	return &ResetUser{
		userRepo:   userRepo,
		authClient: authClient,
	}
}

func (reu *ResetUser) Execute(userID valueobject.UserID, input valueobject.ResetInput) (string, error) {
	user, err := reu.userRepo.FindByEmail(input.OldEmail)
	if err != nil {
		return "", fmt.Errorf("アカウント検索に失敗しました:%w", err)
	}
	if user == nil {
		return "", fmt.Errorf("ユーザーが見つかりませんでした")
	}

	if user.UserID() != userID {
		return "", fmt.Errorf("権限がありません")
	}

	compareErr := user.HashedPassword().Compare(input.OldRawPassword)

	if errors.Is(compareErr, bcrypt.ErrMismatchedHashAndPassword) {
		return "", fmt.Errorf("パスワードが違います")
	} else if compareErr != nil {
		return "", fmt.Errorf("パスワードの照合に失敗しました: %w", err)
	}
	if input.NewEmail != nil {
		user.SetEmail(input.NewEmail)
	}

	if input.NewRawPassword != nil {
		hashedPassword, err := valueobject.HashPassword(*input.NewRawPassword)
		if err != nil {
			return "", fmt.Errorf("パスワードの更新に失敗しました:%w", err)
		}
		user.SetHashedPassword(&hashedPassword)
	}

	updatedUser, err := reu.userRepo.Update(user)
	if err != nil {
		return "", fmt.Errorf("更新に失敗しました:%w", err)
	}

	token, err := reu.authClient.CreateToken(updatedUser.UserID().Value())
	if err != nil {
		return "", fmt.Errorf("トークン発行エラー:%w", err)
	}

	return token, nil

}
