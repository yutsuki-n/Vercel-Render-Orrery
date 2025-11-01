import type { ResTodoDTO } from "../../../domain/dto/todoDTO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodoListVM } from "@/viewModel/todoListVM";

export const TodoList = ({reroad,todos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; todos:ResTodoDTO[];}) => {
    const vm = useTodoListVM({reroad})
    return (
        <div>
                {vm.error && (
                    <p className="pt-5 text-red-500">{vm.error}</p>
                )}

                { todos && todos.length > 0 ? (todos.map((todo) => {
                    return ( 
                        <div className="w-[90%] mx-auto mt-10 border-l-2 border-blue-700 pl-3 mb-10" key={todo.todo_id} >
                            <div className="flex justify-between items-center">
                                <h2 className="text-[20px] my-3 ml-1 text-blue-800 font-bold cursor-pointer inline-block" onClick={() => vm.navigate(`/${todo.todo_id}`)}>{todo.title}</h2>
                                <div className="w-[40%] flex justify-between mr-3">
                                    <Button className="w-[40%] bg-blue-950 hover:bg-blue-900" type="button" onClick={() => vm.handleDuplicate(todo.todo_id)}>コピー</Button>
                                    <Button className="w-[40%] bg-blue-950 hover:bg-blue-900" type="button" onClick={() => vm.handleDelete(todo.todo_id)}>削除</Button>
                                </div>
                            </div>
                            <div className="flex my-2">
                                <p className="text-[18px]">Due date：</p>
                                <p className="text-[18px]">{todo.due_date ? new Date(todo.due_date).toISOString().split("T")[0] : "未設定"}</p>
                            </div>
                            <div className="flex items-center">
                                <p>Completed：</p>
                                <Input className="w-6 h-6 mr-10" type="checkbox" checked={ todo.completed_at != null } onChange={() => vm.handleComplete(todo.todo_id)}></Input>
                                <p>At：</p>
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