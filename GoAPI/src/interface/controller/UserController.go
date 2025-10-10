package controller

import (
	"GoAPI/src/domain/valueobject"
	req "GoAPI/src/interface/dto/request"
	useruse "GoAPI/src/usecase/user"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	rgu *useruse.RegisterUser
	lu  *useruse.LoginUser
	rsu *useruse.ResetUser
	wu  *useruse.WithdrawalUser
}

func NewUserController(
	rgu *useruse.RegisterUser,
	lu *useruse.LoginUser,
	rsu *useruse.ResetUser,
	wu *useruse.WithdrawalUser,
) *UserController {
	return &UserController{
		rgu: rgu,
		lu:  lu,
		rsu: rsu,
		wu:  wu,
	}
}

func (uc *UserController) Register(c echo.Context) error {
	fmt.Println("hello")
	var userDTO req.SignInUserDTO
	if err := c.Bind(&userDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	fmt.Println("2", userDTO.Email, userDTO.RawPassword)
	email, err := valueobject.NewEmail(userDTO.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	rawPassword, err := valueobject.NewRawPassword(userDTO.RawPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	fmt.Println("3", email, rawPassword)
	token, err := uc.rgu.Execute(valueobject.SignInput{
		Email:       email,
		RawPassword: rawPassword,
	})
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, map[string]string{"token": token})
}

func (uc *UserController) Login(c echo.Context) error {
	var userDTO req.SignInUserDTO
	if err := c.Bind(&userDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	fmt.Println(userDTO)

	email, err := valueobject.NewEmail(userDTO.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	rawPassword, err := valueobject.NewRawPassword(userDTO.RawPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	token, err := uc.lu.Execute(valueobject.SignInput{
		Email:       email,
		RawPassword: rawPassword,
	})
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

func (uc *UserController) Reset(c echo.Context) error {
	fmt.Println("yahho")
	userIDStr := c.Get("UserID").(string)
	fmt.Println("userIDStr", userIDStr)
	userID, err := valueobject.FromStringUserID(userIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	fmt.Println("getUserID", userID)
	var userDTO req.UpdateUserDTO
	if err := c.Bind(&userDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	fmt.Println("getUserDTO", userDTO)
	oldEmail, err := valueobject.NewEmail(userDTO.OldEmail)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	oldRawPassword, err := valueobject.NewRawPassword(userDTO.OldRawPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	var newEmail *valueobject.Email
	if userDTO.NewEmail != nil {
		ne, err := valueobject.NewEmail(*userDTO.NewEmail)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		newEmail = &ne
	}

	var newRawPassword *valueobject.RawPassword
	if userDTO.NewRawPassword != nil {
		nr, err := valueobject.NewRawPassword(*userDTO.NewRawPassword)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		newRawPassword = &nr
	}

	fmt.Println("getResetInput", oldEmail, oldRawPassword, newEmail, newRawPassword)
	token, err := uc.rsu.Execute(userID, valueobject.ResetInput{
		OldEmail:       oldEmail,
		OldRawPassword: oldRawPassword,
		NewEmail:       newEmail,
		NewRawPassword: newRawPassword,
	})
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

func (uc *UserController) Withdraw(c echo.Context) error {
	userIDStr := c.Get("UserID").(string)
	userID, err := valueobject.FromStringUserID(userIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	var userDTO req.SignInUserDTO
	if err := c.Bind(&userDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	email, err := valueobject.NewEmail(userDTO.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	rawPassword, err := valueobject.NewRawPassword(userDTO.RawPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	deleteErr := uc.wu.Execute(userID, valueobject.SignInput{
		Email:       email,
		RawPassword: rawPassword,
	})
	if deleteErr != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": deleteErr.Error()})
	}

	return c.NoContent(http.StatusNoContent)
}
