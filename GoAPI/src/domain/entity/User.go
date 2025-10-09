// Package entity for Todo and User operation
package entity

import (
	"GoAPI/src/domain/valueobject"
	"time"
)

type User struct {
	userID         valueobject.UserID
	email          valueobject.Email
	hashedPassword valueobject.HashedPassword
	createdAt      time.Time
	updatedAt      time.Time
}

func NewUser(
	userID valueobject.UserID,
	email valueobject.Email,
	hashedPassword valueobject.HashedPassword,
	createdAt time.Time,
	updatedAt time.Time,
) User {
	return User{
		userID:         userID,
		email:          email,
		hashedPassword: hashedPassword,
		createdAt:      createdAt,
		updatedAt:      updatedAt,
	}
}

func (u *User) UserID() valueobject.UserID {
	return u.userID
}

func (u *User) Email() valueobject.Email {
	return u.email
}

func (u *User) HashedPassword() valueobject.HashedPassword {
	return u.hashedPassword
}

func (u *User) CreatedAt() time.Time {
	return u.createdAt
}

func (u *User) UpdatedAt() time.Time {
	return u.updatedAt
}

func (u *User) SetEmail(email *valueobject.Email) {
	u.email = *email
}

func (u *User) SetHashedPassword(hashedpassword *valueobject.HashedPassword) {
	u.hashedPassword = *hashedpassword
}
