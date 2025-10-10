import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { Create, Duplicate, List, Toggle } from "../../interface/TodoController";
import type { ResTodoDTO } from "../../domain/dto/todoDTO";
import { Delete } from "../../interface/TodoController";

export const Home = () => {

    const [reroadToggle, reroad] = useState<boolean>(true);

    //ユーザー登録系(header転向もあり)
    const [email, setEmail] = useState<string>();
    const [rawPassword, setRawPassword] = useState<string>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("todo作成")
    const handleModal = () => {
        setIsModalOpen(prev => !prev)
        if (isModalOpen) {
            setModalStatus("todo作成")
        } else {
            setModalStatus("閉じる")
        }
    }
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string | undefined>();
    const [dueDate, setDueDate] = useState<Date | undefined>();

    const createSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await Create(title, body, dueDate)
        setTitle("");
        setBody(undefined);
        setDueDate(undefined); 
        handleModal();
        reroad(prev => !prev);
    }

    //検索機能系
    const [todos, setTodos] = useState<ResTodoDTO[]>([]);
    const [searchString, setSearchString] = useState<string | undefined>();
    const [searchDueDateFrom, setSearchDueDateFrom] = useState<Date | undefined>();
    const [searchDueDateTo, setSearchDueDateTo] = useState<Date | undefined>();
    const [searchCompleted, setSearchCompleted] = useState<boolean | undefined>();
    const navigate = useNavigate();
    
    const searchSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            reroad(prev => !prev);
        }

    useEffect( () => {
        console.log(searchString,searchDueDateFrom,searchDueDateTo,searchCompleted);
        (async () => {const todolist = await List(searchString, searchString, searchDueDateFrom, searchDueDateTo, searchCompleted);
        //TodoとBodyを分けるときにはGormの改変も行うこと
        setTodos(todolist);}) ();
    }, [reroadToggle] )

    //todoのいろいろ
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

    return(
        <>
            <div>
                <form onSubmit={searchSubmit}>
                    <input className="title" value={searchString ? searchString : ""} onChange={(e) => setSearchString(e.target.value ? e.target.value : undefined)}></input>
                    <input type="date" className="dueDateFrom" value={searchDueDateFrom ? searchDueDateFrom?.toISOString().split("T")[0] : ""} onChange={(e) => setSearchDueDateFrom(e.target.value ? new Date(e.target.value) : undefined)}></input>
                    <input type="date" className="dueDateTo" value={searchDueDateTo ? searchDueDateTo.toISOString().split("T")[0] : ""} onChange={(e) => setSearchDueDateTo(e.target.value ? new Date(e.target.value) : undefined)}></input>
                    <input type="checkbox" className="completed" checked={ searchCompleted === true } onChange={() => setSearchCompleted(prev => (prev === true ? undefined : true))}></input>
                    <input type="checkbox" className="completed" checked={ searchCompleted === false } onChange={() => setSearchCompleted(prev => (prev === false ? undefined : false))}></input>
                    <button type="submit">検索</button>
                </form>
            </div>

            <div>
                {isModalOpen && (
                    <div className="modal">
                        <form onSubmit={createSubmit}>
                            <input placeholder="タイトル(必須)" className="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            <input placeholder="説明" className="body" value={body ? body : ""} onChange={(e) => setBody(e.target.value ? e.target.value : undefined)}></input>
                            <input type="date" className="dueDate" value={dueDate ? dueDate.toISOString().split("T")[0] : ""} onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)}></input>
                            <button type="submit">todo作成</button>
                        </form>
                    </div>
                )}

                <button onClick={handleModal}>{modalStatus}</button>
            </div>

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
        </>
    )
}