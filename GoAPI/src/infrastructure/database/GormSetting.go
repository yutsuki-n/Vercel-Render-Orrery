// Package database define how handle database
package database

import (
	"GoAPI/src/infrastructure/database/model"
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewGorm() *gorm.DB {

	dsn := os.Getenv("DB_CONNECTION")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("システムエラー")
	}

	migrateUser := db.AutoMigrate(&model.User{})
	if migrateUser != nil {
		panic(fmt.Sprintf("マイグレーションエラー: %v", migrateUser))
	}

	migrateTodo := db.AutoMigrate(&model.Todo{})
	if migrateTodo != nil {
		panic(fmt.Sprintf("マイグレーションエラー: %v", migrateTodo))
	}

	return db
}
