// Package model define DB tables
package model

import "time"

type Todo struct {
	TodoID string `gorm:"primaryKey"`
	UserID string
	User   *User `gorm:"constraint:OnDelete:CASCADE;foreignKey:UserID;references:UserID"`
	//外部キーが設定できているかを確認
	Title       string
	Body        *string
	DueDate     *time.Time
	CompletedAt *time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
