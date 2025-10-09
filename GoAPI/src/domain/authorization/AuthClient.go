// Package authorization is Irepo
package authorization

type IAuthClient interface {
	CreateToken(userID string) (string, error)
}
