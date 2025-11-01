// Package gormrepository define how use DB
package gormrepository

import (
	"GoAPI/src/domain/entity"
	"GoAPI/src/domain/repository"
	"GoAPI/src/domain/valueobject"
	"GoAPI/src/infrastructure/database/model"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type TodoRepository struct {
	db *gorm.DB
}

func NewTodoRepository(db *gorm.DB) repository.ITodoRepository {
	return &TodoRepository{
		db: db,
	}
}

func entityToTodoModel(entity entity.Todo) model.Todo {
	var body *string
	if entity.Body() != nil {
		b := entity.Body().Value()
		body = &b
	} else {
		body = nil
	}

	var dueDate *time.Time
	if entity.DueDate() != nil {
		d := entity.DueDate().Value()
		dueDate = &d
	} else {
		dueDate = nil
	}

	var completedAt *time.Time
	if entity.CompletedAt() != nil {
		c := entity.CompletedAt().Value()
		completedAt = &c
	} else {
		completedAt = nil
	}

	return model.Todo{
		TodoID:      entity.TodoID().Value(),
		UserID:      entity.UserID().Value(),
		Title:       entity.Title().Value(),
		Body:        body,
		DueDate:     dueDate,
		CompletedAt: completedAt,
		CreatedAt:   entity.CreatedAt(),
		UpdatedAt:   entity.UpdatedAt(),
	}
}

func modelToTodoEntity(model model.Todo) entity.Todo {
	todoID, _ := valueobject.FromStringTodoID(model.TodoID)
	userID, _ := valueobject.FromStringUserID(model.UserID)
	title, _ := valueobject.NewTitle(model.Title)

	var body *valueobject.Body
	if model.Body != nil {
		b, _ := valueobject.NewBody(model.Body)
		body = &b
	} else {
		body = nil
	}
	fmt.Println("body", body)

	var dueDate *valueobject.DueDate
	if model.DueDate != nil {
		d := valueobject.ExistingDueDate(model.DueDate)
		dueDate = &d
	} else {
		dueDate = nil
	}
	fmt.Println("dueDate", dueDate)

	var completedAt *valueobject.CompletedAt
	if model.CompletedAt != nil {
		c, _ := valueobject.NewCompletedAt(model.CompletedAt)
		completedAt = &c
	} else {
		completedAt = nil
	}
	fmt.Println("completedAt", completedAt)

	return entity.NewTodo(
		todoID,
		userID,
		title,
		body,
		dueDate,
		completedAt,
		model.CreatedAt,
		model.UpdatedAt,
	)
}

func (tq TodoRepository) Create(todo *entity.Todo) (*entity.Todo, error) {
	modelTodo := entityToTodoModel(*todo)

	result := tq.db.Create(&modelTodo)
	if result.Error != nil {
		return nil, fmt.Errorf("Todo作成に失敗しました:%w", result.Error)
	}
	entityTodo := modelToTodoEntity(modelTodo)

	return &entityTodo, nil
}

func (tq TodoRepository) FindByID(todoID valueobject.TodoID) (*entity.Todo, error) {
	todo := model.Todo{}
	result := tq.db.Model(&model.Todo{}).Where("todo_id = ?", todoID.Value()).Take(&todo)
	if result.Error != nil {
		return nil, fmt.Errorf("システムエラー:%w", result.Error)
	}
	entityTodo := modelToTodoEntity(todo)
	return &entityTodo, nil
}

func (tq TodoRepository) FindByUserIDWithFilters(input valueobject.ListTodoInput) (*[]entity.Todo, error) {
	todos := []model.Todo{}

	query := tq.db.Model(&model.Todo{}).Where("user_id = ?", input.UserID.Value())
	orQuery := tq.db.Model(&model.Todo{})

	if input.Title != nil && input.Body != nil {
		query = query.Where("(title LIKE ? OR Body LIKE ?)", "%"+input.Title.Value()+"%", "%"+input.Body.Value()+"%")
	} else if input.Title != nil {
		orQuery = orQuery.Where("title LIKE ?", "%"+input.Title.Value()+"%")
	} else if input.Body != nil {
		orQuery = orQuery.Where("body LIKE ?", "%"+input.Body.Value()+"%")
	}

	query = query.Where(orQuery)

	if input.DueDateFrom != nil && input.DueDateTo != nil {
		query = query.Where("due_date BETWEEN ? AND ?", input.DueDateFrom, input.DueDateTo)
	} else if input.DueDateFrom != nil {
		query = query.Where("due_date >= ?", input.DueDateFrom)
	} else if input.DueDateTo != nil {
		query = query.Where("due_date <= ?", input.DueDateTo)
	}

	if input.Completed != nil {
		if *input.Completed {
			query = query.Where("completed_at IS NOT NULL")
		} else {
			query = query.Where("completed_at IS NULL")
		}
	}
	fmt.Println("レポジトリ,query", query)
	result := query.Order("created_at DESC").Find(&todos)
	if result.Error != nil {
		return nil, fmt.Errorf("システムエラー:%w", result.Error)
	}
	var entityTodos []entity.Todo
	for _, todo := range todos {
		foundTodo := modelToTodoEntity(todo)
		entityTodos = append(entityTodos, foundTodo)
	}
	return &entityTodos, nil
}

func (tq TodoRepository) Update(todo *entity.Todo) (*entity.Todo, error) {
	fmt.Println("レポジトリに来たアップデートインプットのtodo", todo)
	modelTodo := entityToTodoModel(*todo)
	fmt.Println("モデル化のmodeltodo", modelTodo)
	updates := map[string]interface{}{
		"title":        modelTodo.Title,
		"body":         modelTodo.Body,
		"due_date":     modelTodo.DueDate,
		"completed_at": modelTodo.CompletedAt,
	}
	result := tq.db.Model(&model.Todo{}).Where("todo_id = ?", modelTodo.TodoID).Updates(updates)
	if result.Error != nil {
		return nil, fmt.Errorf("システムエラー:%w", result.Error)
	}
	if err := tq.db.Where("todo_id = ?", modelTodo.TodoID).Take(&modelTodo).Error; err != nil {
		return nil, fmt.Errorf("更新後の取得に失敗しました:%w", err)
	}
	entityTodo := modelToTodoEntity(modelTodo)

	return &entityTodo, nil
}

func (tq TodoRepository) Delete(todoID valueobject.TodoID) error {
	result := tq.db.Where("todo_id = ?", todoID.Value()).Delete(&model.Todo{})
	if result.Error != nil {
		return fmt.Errorf("デリート失敗:%w", result.Error)
	}

	return nil
}
