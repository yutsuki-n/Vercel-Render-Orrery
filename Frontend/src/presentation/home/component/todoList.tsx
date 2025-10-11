import { Duplicate, Toggle } from "../../../interface/TodoController";
import { Delete } from "../../../interface/TodoController";
import type { ResTodoDTO } from "../../../domain/dto/todoDTO";
import { useNavigate } from "react-router";

export const TodoList = ({reroad,todos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; todos:ResTodoDTO[];}) => {
    const navigate = useNavigate();
    const handleComplete = async (id: string) => {
        await Toggle(id)
        reroad(prev =>!prev);
    }

    const handleDuplicate = async (id: string) => {
        await Duplicate(id)
        reroad(prev => !prev);
    }

    const handleDelete = async (id: string) => {
        const check = window.confirm("本当に削除しますか？");
        if (check) {
           await Delete(id);
        } 
        reroad(prev => !prev);
    }

    return (
        <div>
                { todos && todos.length > 0 ? (todos.map((todo) => {
                    return ( 
                        <div key={todo.todo_id} >
                            <h3 onClick={() => navigate(`/${todo.todo_id}`)}>{todo.title}</h3>
                            <p>{todo.due_date ? new Date(todo.due_date).toISOString().split("T")[0] : undefined}</p>
                            <p>{todo.completed_at ? new Date(todo.completed_at).toISOString().split("T")[0] : undefined}</p>
                            <input type="checkbox" checked={ todo.completed_at != null } onChange={() => handleComplete(todo.todo_id)}></input>
                            <button type="button" onClick={() => handleDuplicate(todo.todo_id)}>コピー</button>
                            <button type="button" onClick={() => handleDelete(todo.todo_id)}>削除</button>
                        </div>
                        )
                    })) : (<p>Todoがありません</p>)
                }
            </div>

    )
}