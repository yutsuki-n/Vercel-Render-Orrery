import React, { useEffect, useState } from "react"
import type { ResTodoDTO } from "../../domain/dto/todoDTO";
import { useNavigate, useParams } from "react-router";
import { Get, Update } from "../../interface/TodoController";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Body, CompletedAt, DueDate, Title } from "@/domain/valueObject";

export const Detail = () => {

  const { id } = useParams<{id: string}>();
  const [todo, setTodo] = useState<ResTodoDTO>();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string | null>();
  const [dueDate, setDueDate] = useState<Date | null>();
  const [completedAt, setCompletedAt] = useState<Date | null>();
  const [error, setError] = useState("");
  const [tError, setTError] = useState("");
  const [bError, setBError] = useState("");
  const [dError, setDError] = useState("");
  const [cError, setCError] = useState("");
  const navigate = useNavigate();
 
  useEffect( () => {
    (async () => {
      if (!id) return <p>不正なアクセスです</p>;
      try { const foundTodo = await Get(id);
      setTodo(foundTodo);
      setTitle(foundTodo.title);
      setBody(foundTodo.body);
      if (foundTodo.due_date) {
        setDueDate(new Date(foundTodo.due_date))
      }
      if (foundTodo.completed_at) {
        setCompletedAt(new Date(foundTodo.completed_at))
      }
    } catch (err: any) {
      setError(err.message || "セッションが切れました")

      if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
        navigate("/", { state: { msg: "セッションが切れました"} });
      }
    }
    }) ();
  },[])

  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return <p>不正なアクセスです</p>

    try {
      console.log("from detail",id,title,body,dueDate,completedAt) 
      await Update(id, title, body, dueDate, completedAt);
      navigate("/home")
    } catch (err: any) {
      setError(err.message || "セッションが切れました")

      if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
        navigate("/", { state: { msg: "セッションが切れました"} });
      }
    }
  }

  const inputTitle = (input: string) => {  
            try {
                Title.validation(input);
                setTitle(input);
                setTError("");
            } catch (err: any) {
                setTError(err.message);
            }
  }

  const inputBody = (input: string | undefined) => {  
            try {
                Body.validation(input ?? null);
                setBody(input);
                setBError("");
            } catch (err: any) {
                setBError(err.message);
            }
  }

  const inputDueDate = (input: Date | undefined) => {     
            try {
                DueDate.validation(input ?? null);
                setDueDate(input ?? null);
                setDError("");
            } catch (err: any) {
                setDError(err.message);
            }
  }

  const inputCompletedAt = (input: Date | undefined) => {     
            try {
                CompletedAt.validation(input ?? null);
                setCompletedAt(input ?? null);
                setCError("");
            } catch (err: any) {
                setCError(err.message);
            }
  }


  if (!id) return <p>不正なアクセスです</p>
  if (!todo) return <p>読み込み中...</p>

  return(
    <div className="w-[90%] mx-auto">
      <div className="flex justify-between">
        <h2 className="text-[25px] text-blue-800" >Details</h2>
        <div className="text-right w-[80%] mx-auto text-blue-900">
          <p>作成日：{new Date(todo.created_at).toISOString().split("T")[0] }</p>
          <p>最終更新日：{new Date(todo.updated_at).toISOString().split("T")[0] }</p>
        </div>
      </div>
      <div className="flex justify-between w-[90%] mx-auto mt-8 items-center">
        <div>
          {error && (
              <p className=" text-red-500">{error}</p>
          )}
          {tError && (
              <p className=" text-red-500">{tError}</p>
          )}
          {bError && (
              <p className=" text-red-500">{bError}</p>
          )}
          {dError && (
              <p className=" text-red-500">{dError}</p>
          )}
          {cError && (
              <p className=" text-red-500">{cError}</p>
          )}
        </div>
        <Button className="w-[35%] ml-auto bg-blue-950 hover:bg-blue-900" onClick={() => navigate("/home")}>変更せず戻る</Button>
      </div>
      <form className="mt-3" onSubmit={updateSubmit}>
        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">title</h1>
        <Input className="mb-5 border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
               value={title} onChange={(e) => inputTitle(e.target.value)}/>

        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">about</h1>
        <Textarea className="mb-5 resize-none h-30 border-0 border-l-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
                  value={body ?? undefined} onChange={(e) => inputBody(e.target.value)}/>

        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">Due date</h1>
        <Input className="mb-5 border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
              type="date" value={dueDate ? dueDate?.toISOString().split("T")[0] : "" } 
              onChange={(e) => inputDueDate(e.target.value ? new Date(e.target.value) : undefined )}></Input>

        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">Completed at</h1>
        <Input className="mb-5 border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
              type="date" value={completedAt ? completedAt?.toISOString().split("T")[0] : "" } 
              onChange={(e) => inputCompletedAt(e.target.value ? new Date(e.target.value) : undefined)}></Input>
        <Button className="mt-15 w-[60%] mx-auto block bg-blue-950 hover:bg-blue-900" type="submit" >変更して戻る</Button>
      </form>
    </div>
  )
}