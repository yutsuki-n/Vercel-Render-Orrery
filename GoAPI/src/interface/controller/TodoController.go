// Package controller ルーティング
package controller

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/valueobject"
	req "GoAPI/src/interface/dto/request"
	res "GoAPI/src/interface/dto/response"
	todouse "GoAPI/src/usecase/todo"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type TodoController struct {
	ct  *todouse.CreateTodo
	dpt *todouse.DuplicateTodo
	gt  *todouse.GetTodo
	lt  *todouse.ListTodo
	tt  *todouse.ToggleTodo
	ut  *todouse.UpdateTodo
	dlt *todouse.DeleteTodo
}

func NewTodoController(
	ct *todouse.CreateTodo,
	dpt *todouse.DuplicateTodo,
	gt *todouse.GetTodo,
	lt *todouse.ListTodo,
	tt *todouse.ToggleTodo,
	ut *todouse.UpdateTodo,
	dlt *todouse.DeleteTodo,
) *TodoController {
	return &TodoController{
		ct:  ct,
		dpt: dpt,
		gt:  gt,
		lt:  lt,
		tt:  tt,
		ut:  ut,
		dlt: dlt,
	}
}

func entityToDTO(todo *entity.Todo) res.TodoDTO {
	var body *string
	if todo.Body() != nil {
		b := todo.Body().Value()
		body = &b
	}

	var dueDate *time.Time
	if todo.DueDate() != nil {
		d := todo.DueDate().Value()
		dueDate = &d
	}

	var completedAt *time.Time
	if todo.CompletedAt() != nil {
		c := todo.CompletedAt().Value()
		completedAt = &c
	}

	return res.TodoDTO{
		TodoID:      todo.TodoID().Value(),
		UserID:      todo.UserID().Value(),
		Title:       todo.Title().Value(),
		Body:        body,
		DueDate:     dueDate,
		CompletedAt: completedAt,
		CreatedAt:   todo.CreatedAt(),
		UpdatedAt:   todo.UpdatedAt(),
	}
}

func (tc *TodoController) Create(c echo.Context) error {
	userIDStr := c.Get("UserID").(string)
	fmt.Println("hello from controller,userIDStr", userIDStr)

	userID, err := valueobject.FromStringUserID(userIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	fmt.Println("userID", userID)

	var todoDTO req.CreateTodoDTO
	if err := c.Bind(&todoDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	fmt.Println("todoDTO", todoDTO)

	title, err := valueobject.NewTitle(todoDTO.Title)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	var body *valueobject.Body
	if todoDTO.Body != nil {
		b, err := valueobject.NewBody(todoDTO.Body)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		body = &b
	}

	var dueDate *valueobject.DueDate
	if todoDTO.DueDate != nil {
		parsedDueDate, err := time.Parse("2006-01-02", *todoDTO.DueDate)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日時の形式で書いてください; YYYY-MM-DD"})
		}
		d, err := valueobject.NewDueDate(&parsedDueDate)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		dueDate = &d
	}

	input := valueobject.CreateTodoInput{
		UserID:  userID,
		Title:   title,
		Body:    body,
		DueDate: dueDate,
	}
	fmt.Println("input", input)
	todo, err := tc.ct.Execute(input)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	fmt.Println("from controller executed todo ", todo)
	createRes := entityToDTO(todo)
	fmt.Println("respond, DTOTodo", createRes)
	return c.JSON(http.StatusCreated, createRes)

}

func (tc TodoController) Duplicate(c echo.Context) error {
	userIDStr := c.Get("UserID").(string)
	userID, err := valueobject.FromStringUserID(userIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todoIDStr := c.Param("TodoID")
	todoID, err := valueobject.FromStringTodoID(todoIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todo, err := tc.dpt.Execute(todoID, userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}

	duplicateRes := entityToDTO(todo)
	return c.JSON(http.StatusCreated, duplicateRes)
}

func (tc TodoController) Get(c echo.Context) error {
	userIDString := c.Get("UserID").(string)
	userID, err := valueobject.FromStringUserID(userIDString)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todoIDStr := c.Param("TodoID")
	todoID, err := valueobject.FromStringTodoID(todoIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todo, err := tc.gt.Execute(todoID, userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}

	getRes := entityToDTO(todo)
	return c.JSON(http.StatusOK, getRes)
}

func (tc TodoController) List(c echo.Context) error {
	userIDStr := c.Get("UserID").(string)
	fmt.Println("コントローラー Get UserID", userIDStr)
	userID, err := valueobject.FromStringUserID(userIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	var todoDTO req.ListTodoDTO
	if err := c.Bind(&todoDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	fmt.Println("コントローラー todoDTO", todoDTO)

	var title *valueobject.Title
	if todoDTO.Title != nil {
		t, err := valueobject.NewTitle(*todoDTO.Title)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		title = &t
	}
	fmt.Println("コントローラー,title", title)

	var body *valueobject.Body
	if todoDTO.Body != nil {
		b, err := valueobject.NewBody(todoDTO.Body)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		body = &b
	}
	fmt.Println("コントローラー,body", body)

	var dueDateFrom *time.Time
	if todoDTO.DueDateFrom != nil {
		df, err := time.Parse("2006-01-02", *todoDTO.DueDateFrom)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日付を入力してください; YYYY-MM-DD"})
		}
		dueDateFrom = &df
	}
	fmt.Println("コントローラー,duedatefrom", dueDateFrom)

	var dueDateTo *time.Time
	if todoDTO.DueDateTo != nil {
		dt, err := time.Parse("2006-01-02", *todoDTO.DueDateTo)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日付を入力してください; YYYY-MM-DD"})
		}
		dueDateTo = &dt
	}
	fmt.Println("コントローラー,duedateto", dueDateTo)

	var completed *bool
	if todoDTO.Completed != nil {
		judge, err := strconv.ParseBool(*todoDTO.Completed)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		completed = &judge
	}
	fmt.Println("コントローラー,completed", completed)

	todos, err := tc.lt.Execute(valueobject.ListTodoInput{
		UserID:      userID,
		Title:       title,
		Body:        body,
		DueDateFrom: dueDateFrom,
		DueDateTo:   dueDateTo,
		Completed:   completed,
	})
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	var listReq []res.TodoDTO
	for _, todo := range *todos {
		listReq = append(listReq, entityToDTO(&todo))
	}

	return c.JSON(http.StatusOK, listReq)
}

func (tc TodoController) Toggle(c echo.Context) error {
	userIDString := c.Get("UserID").(string)
	userID, err := valueobject.FromStringUserID(userIDString)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todoIDStr := c.Param("TodoID")
	todoID, err := valueobject.FromStringTodoID(todoIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todo, err := tc.tt.Execute(todoID, userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}

	toggleRes := entityToDTO(todo)
	return c.JSON(http.StatusCreated, toggleRes)
}

func (tc TodoController) Update(c echo.Context) error {
	userIDStr := c.Get("UserID").(string)
	userID, err := valueobject.FromStringUserID(userIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todoIDStr := c.Param("TodoID")
	todoID, err := valueobject.FromStringTodoID(todoIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	var todoDTO req.UpdateTodoDTO
	if err := c.Bind(&todoDTO); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	var title *valueobject.Title
	if todoDTO.Title != nil {
		t, err := valueobject.NewTitle(*todoDTO.Title)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		title = &t
	}

	var body *valueobject.Body
	if todoDTO.Body != nil {
		b, err := valueobject.NewBody(todoDTO.Body)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		}
		body = &b
	}
	fmt.Println("6 コントローラー,body", body)

	var dueDate *valueobject.DueDate
	if todoDTO.DueDate != nil && *todoDTO.DueDate != "" {
		fmt.Println("パターン１")
		d, err := time.Parse("2006-01-02", *todoDTO.DueDate)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日付を入力してください; YYYY-MM-DD"})
		}
		D, err := valueobject.NewDueDate(&d)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日付を入力してください; YYYY-MM-DD"})
		}
		dueDate = &D
	} else if todoDTO.DueDate != nil && *todoDTO.DueDate == "" {
		fmt.Println("パターン２")
		max, _ := time.Parse("2006-01-02", "9999-12-31")
		d, _ := valueobject.NewDueDate(&max)
		dueDate = &d
	}

	// fmt.Println("7 コントローラー,dueDate", dueDate)

	var completedAt *valueobject.CompletedAt
	if todoDTO.CompletedAt != nil && *todoDTO.CompletedAt != "" {
		pc, err := time.Parse("2006-01-02", *todoDTO.CompletedAt)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日付を入力してください; YYYY-MM-DD"})
		}
		PC, err := valueobject.NewCompletedAt(&pc)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "日付を入力してください; YYYY-MM-DD"})
		}
		completedAt = &PC
	} else if todoDTO.CompletedAt != nil && *todoDTO.CompletedAt == "" {
		min, _ := time.Parse("2006-01-02", "0001-01-01")
		c, _ := valueobject.NewCompletedAt(&min)
		completedAt = &c
	}

	fmt.Println("コントローラー", todoID, userID, title, body, dueDate, completedAt)
	todo, err := tc.ut.Execute(valueobject.UpdateTodoInput{
		TodoID:      todoID,
		UserID:      userID,
		Title:       title,
		Body:        body,
		DueDate:     dueDate,
		CompletedAt: completedAt,
	})
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}
	updateRes := entityToDTO(todo)
	return c.JSON(http.StatusOK, updateRes)
}

func (tc TodoController) Delete(c echo.Context) error {
	userIDString := c.Get("UserID").(string)
	userID, err := valueobject.FromStringUserID(userIDString)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	todoIDStr := c.Param("TodoID")
	todoID, err := valueobject.FromStringTodoID(todoIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	deleteErr := tc.dlt.Execute(todoID, userID)
	if deleteErr != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": deleteErr.Error()})
	}

	return c.NoContent(http.StatusNoContent)
}
