// Package main is server
package main

import (
	"GoAPI/src/di"
	CustomMiddleware "GoAPI/src/interface/middleware"
	"fmt"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"https://vercel-render-orrery.vercel.app",
			"http://localhost:5173",
		},
		AllowMethods:     []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	e.Static("/", "Frontend/dist")
	e.File("/*", "Frontend/dist/index.html")

	userController := di.InitializeUserController()
	e.POST("/register", userController.Register)
	e.POST("/login", userController.Login)
	userAuthGroup := e.Group("/users")
	userAuthGroup.Use(CustomMiddleware.AuthMiddleware)
	userAuthGroup.PATCH("/reset", userController.Reset)
	userAuthGroup.POST("/withdraw", userController.Withdraw)

	todoController := di.InitializeTodoController()
	todoAuthGroup := e.Group("/todos")
	todoAuthGroup.Use(CustomMiddleware.AuthMiddleware)
	todoAuthGroup.POST("", todoController.Create)
	todoAuthGroup.GET("", todoController.List)
	todoAuthGroup.GET("/:TodoID", todoController.Get)
	todoAuthGroup.PATCH("/:TodoID", todoController.Update)
	todoAuthGroup.PATCH("/:TodoID/toggle", todoController.Toggle)
	todoAuthGroup.DELETE("/:TodoID", todoController.Delete)
	todoAuthGroup.POST("/:TodoID/duplicate", todoController.Duplicate)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		fmt.Println("server start at http://localhost:8080")
	}

	e.Logger.Fatal(e.Start(":" + port))
}
