package repository

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/valueobject"
)

type IUserRepository interface {
	Create(user *entity.User) error
	Update(user *entity.User) (*entity.User, error)
	FindByEmail(email valueobject.Email) (*entity.User, error)
	Delete(userID valueobject.UserID) error
}
