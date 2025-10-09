// Package user is user's usecase
package user

import (
	auth "GoAPI/src/domain/authorization"
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"fmt"
	"time"
)

type RegisterUser struct {
	userRepo   repository.IUserRepository
	authClient auth.IAuthClient
}

func NewRegisterUser(userRepo repository.IUserRepository, authClient auth.IAuthClient) *RegisterUser {
	return &RegisterUser{
		userRepo:   userRepo,
		authClient: authClient,
	}
}

func (ru RegisterUser) Execute(input valueobject.SignInput) (string, error) {
	fmt.Println("hello from register")
	foundUser, _ := ru.userRepo.FindByEmail(input.Email)

	fmt.Println("4", foundUser)
	if foundUser != nil {
		return "", fmt.Errorf("既に登録されています")
	}

	fmt.Println("5")
	hashedPassword, err := valueobject.HashPassword(input.RawPassword)
	if err != nil {
		return "", fmt.Errorf("パスワードの作成に失敗しました:%w", err)
	}

	user := entity.NewUser(
		valueobject.NewUserID(),
		input.Email,
		hashedPassword,
		time.Now(),
		time.Now(),
	)

	if err := ru.userRepo.Create(&user); err != nil {
		return "", fmt.Errorf("user作成に失敗しました:%w", err)
	}

	token, err := ru.authClient.CreateToken(user.UserID().Value())
	if err != nil {
		return "", fmt.Errorf("トークン発行エラー:%w", err)
	}
	fmt.Println("yatta")
	return token, nil
}
