// Package auth is creaetToken's file
package auth

import (
	"GoAPI/src/domain/authorization"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
)

type AuthClient struct{}

func NewAuthClient() authorization.IAuthClient {
	return AuthClient{}
}

func (a AuthClient) CreateToken(userID string) (string, error) {
	err := godotenv.Load()
	if err != nil {
		return "", fmt.Errorf("システムエラー:%w", err)
	}
	secretKey := os.Getenv("JWT_SECRET_KEY")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}
