package gormrepository

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"GoAPI/src/infrastructure/database/model"
	"fmt"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) repository.IUserRepository {
	return &UserRepository{
		db: db,
	}
}

func entityToUserModel(entity entity.User) model.User {
	return model.User{
		UserID:         entity.UserID().Value(),
		Email:          entity.Email().Value(),
		HashedPassword: entity.HashedPassword().Value(),
		CreatedAt:      entity.CreatedAt(),
		UpdatedAt:      entity.UpdatedAt(),
	}
}

func modelToUserEntity(model model.User) entity.User {
	userID, _ := valueobject.FromStringUserID(model.UserID)
	email, _ := valueobject.NewEmail(model.Email)
	hashedPassword, _ := valueobject.FromStringHashedPassword(model.HashedPassword)

	return entity.NewUser(
		userID,
		email,
		hashedPassword,
		model.CreatedAt,
		model.UpdatedAt,
	)
}

func (uq UserRepository) Create(user *entity.User) error {
	modelUser := entityToUserModel(*user)
	result := uq.db.Create(&modelUser)
	if result.Error != nil {
		return fmt.Errorf("システムエラー:%w", result.Error)
	}
	return nil
}

func (uq UserRepository) Update(user *entity.User) (*entity.User, error) {
	modelUser := entityToUserModel(*user)
	result := uq.db.Model(&model.User{}).Where("user_id = ?", modelUser.UserID).Updates(model.User{
		Email:          modelUser.Email,
		HashedPassword: modelUser.HashedPassword,
		UpdatedAt:      modelUser.UpdatedAt,
	})
	if result.Error != nil {
		return nil, fmt.Errorf("システムエラー:%w", result.Error)
	}
	uq.db.Model(&model.User{}).Where("user_id = ?", modelUser.UserID).Take(&modelUser)
	entityUser := modelToUserEntity(modelUser)
	return &entityUser, nil
}

func (uq UserRepository) FindByEmail(email valueobject.Email) (*entity.User, error) {
	var modelUser model.User
	stringEmail := email.Value()
	fmt.Println("3!", stringEmail)
	result := uq.db.Model(model.User{}).Where("email = ?", stringEmail).Take(&modelUser)
	if result.Error != nil {
		return nil, fmt.Errorf("システムエラー:%w", result.Error)
	}
	fmt.Println("3!!", modelUser)
	entityUser := modelToUserEntity(modelUser)

	return &entityUser, nil
}

func (uq UserRepository) Delete(userID valueobject.UserID) error {
	stringUserID := userID.Value()

	result := uq.db.Where("user_id = ?", stringUserID).Delete(model.User{})
	if result.Error != nil {
		return fmt.Errorf("User削除エラー:%w", result.Error)
	}

	return nil
}
