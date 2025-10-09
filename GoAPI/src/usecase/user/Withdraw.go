package user

import (
	auth "GoAPI/src/domain/authorization"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type WithdrawalUser struct {
	userRepo   repository.IUserRepository
	authClient auth.IAuthClient
}

func NewWithdrawUser(
	userRepo repository.IUserRepository,
	authClient auth.IAuthClient,
) *WithdrawalUser {
	return &WithdrawalUser{
		userRepo:   userRepo,
		authClient: authClient,
	}
}

func (wu WithdrawalUser) Execute(userID valueobject.UserID, input valueobject.SignInput) error {
	user, err := wu.userRepo.FindByEmail(input.Email)
	if err != nil {
		return fmt.Errorf("ユーザー検索エラー:%w", err)
	}
	if user == nil {
		return fmt.Errorf("ユーザーが見つかりませんでした")
	}

	if user.UserID() != userID {
		return fmt.Errorf("権限がありません")
	}

	compareErr := user.HashedPassword().Compare(input.RawPassword)

	if errors.Is(compareErr, bcrypt.ErrMismatchedHashAndPassword) {
		return fmt.Errorf("パスワードが違います")
	} else if compareErr != nil {
		return fmt.Errorf("パスワード照合エラー:%w", compareErr)
	}

	deleteErr := wu.userRepo.Delete(user.UserID())
	if deleteErr == nil {
		fmt.Println("ユーザーが削除されました")
	}

	return deleteErr
}
