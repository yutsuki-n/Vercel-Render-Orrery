package valueobject

type SignInput struct {
	Email       Email
	RawPassword RawPassword
}

type ResetInput struct {
	UserID         UserID
	OldEmail       Email
	OldRawPassword RawPassword
	NewEmail       *Email
	NewRawPassword *RawPassword
}
