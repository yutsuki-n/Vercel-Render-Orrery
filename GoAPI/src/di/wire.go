//go:build wireinject
// +build wireinject

package di

import (
	"GoAPI/src/infrastructure/auth"
	"GoAPI/src/infrastructure/database"
	"GoAPI/src/infrastructure/database/gormrepository"
	"GoAPI/src/interface/controller"
	"GoAPI/src/usecase/todo"
	"GoAPI/src/usecase/user"

	"github.com/google/wire"
)

func InitializeUserController() *controller.UserController {
	wire.Build(
		database.NewGorm,
		gormrepository.NewUserRepository,
		auth.NewAuthClient,
		user.NewWithdrawalUser,
		user.NewResetUser,
		user.NewLoginUser,
		user.NewRegisterUser,
		controller.NewUserController,
	)
	return &controller.UserController{}
}

func InitializeTodoController() *controller.TodoController {
	wire.Build(
		database.NewGorm,
		gormrepository.NewTodoRepository,
		todo.NewCreateTodo,
		todo.NewDuplicateTodo,
		todo.NewGetTodo,
		todo.NewListTodo,
		todo.NewToggleTodo,
		todo.NewUpdateTodo,
		todo.NewDeleteTodo,
		controller.NewTodoController,
	)
	return &controller.TodoController{}
}
