package model

import "time"

type User struct {
	UserID         string `gorm:"primaryKey"`
	Email          string `gorm:"uniqueIndex"`
	HashedPassword string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	// Todos          []Todo `gorm:"foreignKey:UserID;references:UserID"`
}
