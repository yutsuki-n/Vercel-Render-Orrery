import { Duplicate, Toggle } from "../../../interface/TodoController";
import { Delete } from "../../../interface/TodoController";
import type { ResTodoDTO } from "../../../domain/dto/todoDTO";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const TodoList = ({reroad,todos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; todos:ResTodoDTO[];}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleComplete = async (id: string) => {
        try {
            await Toggle(id)
            await new Promise(resolve => setTimeout(resolve, 100));
            reroad(prev =>!prev);
        } catch (err: any) {
            setError(err.message || "セッションが切れました")
            if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
                navigate("/", {state: {msg: "セッションが切れました"}});
            }
        }
    }

    const handleDuplicate = async (id: string) => {
        try {
            await Duplicate(id)
            await new Promise(resolve => setTimeout(resolve, 100));
            reroad(prev => !prev);
        } catch (err: any) {
            setError(err.message || "セッションが切れました")
            if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
                navigate("/", {state: {msg: "セッションが切れました"}});
            }
        }
    }

    const handleDelete = async (id: string) => {
        const check = window.confirm("本当に削除しますか？");
        if (check) {
            try {
                await Delete(id);
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (err: any) {
                setError(err.message || "セッションが切れました")
                if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
                    navigate("/", {state: {msg: "セッションが切れました"}});
                }
            }
        } 
        reroad(prev => !prev);
    }

    return (
        <div>
                {error && (
                    <p className="pt-5 text-red-500">{error}</p>
                )}

                { todos && todos.length > 0 ? (todos.map((todo) => {
                    return ( 
                        <div className="w-[90%] mx-auto mt-10 border-l-2 border-blue-700 pl-3 mb-10" key={todo.todo_id} >
                            <div className="flex justify-between items-center">
                                <h2 className="text-[20px] my-3 ml-1 text-blue-800 font-bold cursor-pointer inline-block" onClick={() => navigate(`/${todo.todo_id}`)}>{todo.title}</h2>
                                <div className="w-[40%] flex justify-between mr-3">
                                    <Button className="w-[40%] bg-blue-950 hover:bg-blue-900" type="button" onClick={() => handleDuplicate(todo.todo_id)}>コピー</Button>
                                    <Button className="w-[40%] bg-blue-950 hover:bg-blue-900" type="button" onClick={() => handleDelete(todo.todo_id)}>削除</Button>
                                </div>
                            </div>
                            <div className="flex my-2">
                                <p className="text-[18px]">期日：</p>
                                <p className="text-[18px]">{todo.due_date ? new Date(todo.due_date).toISOString().split("T")[0] : "未設定"}</p>
                            </div>
                            <div className="flex items-center">
                                <p>Check：</p>
                                <Input className="w-6 h-6 mr-10" type="checkbox" checked={ todo.completed_at != null } onChange={() => handleComplete(todo.todo_id)}></Input>
                                <p>完了日：</p>
                                <p>{todo.completed_at ? new Date(todo.completed_at).toISOString().split("T")[0] : "未完了"}</p>
                            </div>
                        </div>
                        )
                    })) : ( <div className="w-[90%] mx-auto mt-10 text-blue-800">
                            <p className="text-[18px]">Todoがありません</p>
                            </div>
                          )
                }
            </div>

    )
}