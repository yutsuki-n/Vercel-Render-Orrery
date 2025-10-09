package request

type SignInUserDTO struct {
	Email       string `json:"email" validate:"required"`
	RawPassword string `json:"raw_password" validate:"required"`
}

type UpdateUserDTO struct {
	OldEmail       string  `json:"old_email" validate:"required"`
	OldRawPassword string  `json:"old_raw_password" validate:"required"`
	NewEmail       *string `json:"new_email" validate:"required"`
	NewRawPassword *string `json:"new_raw_password" validate:"required"`
}
