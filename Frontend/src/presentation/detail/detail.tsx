import React, { useEffect, useState } from "react"
import type { ResTodoDTO } from "../../domain/dto/todoDTO";
import { useNavigate, useParams } from "react-router";
import { Get, Update } from "../../interface/TodoController";

export const Detail = () => {

  const { id } = useParams<{id: string}>();
  const [todo, setTodo] = useState<ResTodoDTO>();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string | null>();
  const [dueDate, setDueDate] = useState<Date | null>();
  const [completedAt, setCompletedAt] = useState<Date | null>();
  const navigate = useNavigate();
 
  useEffect( () => {
    (async () => {
      if (!id) return <p>不正なアクセスです</p>;
      const foundTodo = await Get(id);
      setTodo(foundTodo);
      setTitle(foundTodo.title);
      setBody(foundTodo.body);
      if (foundTodo.due_date) {
        setDueDate(new Date(foundTodo.due_date))
      }
      if (foundTodo.completed_at) {
        setCompletedAt(new Date(foundTodo.completed_at))
      }
    }) ();
  },[])

  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return <p>不正なアクセスです</p>

    console.log("from detail",id,title,body,dueDate,completedAt) 
    await Update(id, title, body, dueDate, completedAt);
    navigate("/home")
  }

  if (!id) return <p>不正なアクセスです</p>
  if (!todo) return <p>読み込み中...</p>

  return(
    <>
      <form onSubmit={updateSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea value={body ?? undefined} onChange={(e) => setBody(e.target.value)}/>
        <input type="date" value={dueDate ? dueDate?.toISOString().split("T")[0] : "" } onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : null )}></input>
        <input type="date" value={completedAt ? completedAt?.toISOString().split("T")[0] : "" } onChange={(e) => setCompletedAt(e.target.value ? new Date(e.target.value) : null)}></input>
        <p>{new Date(todo.created_at).toISOString().split("T")[0] }</p>
        <p>{new Date(todo.updated_at).toISOString().split("T")[0] }</p>
        <button type="submit" >変更して戻る</button>
      </form>
      <button onClick={() => navigate("/home")}>変更せず戻る</button>
    </>
  )
}