import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/domain/entity/todo";
import { useTodoListVM } from "@/viewModel/todoListVM";

export const TodoList = ({reroad,todos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; todos:Todo[];}) => {
    const vm = useTodoListVM({reroad})
    return (
        <div>
                {vm.error && (
                    <p className="pt-5 text-red-500">{vm.error}</p>
                )}

                { todos && todos.length > 0 ? (todos.map((todo) => {
                    return ( 
                        <div className="w-[90%] mx-auto mt-10 border-l-2 border-blue-700 pl-3 mb-10" key={todo.TodoID} >
                            <div className="flex justify-between items-center">
                                <h2 className="text-[20px] my-3 ml-1 text-blue-800 font-bold cursor-pointer inline-block" onClick={() => vm.navigate(`/${todo.TodoID}`)}>{todo.Title.Value()}</h2>
                                <div className="w-[40%] flex justify-between mr-3">
                                    <Button className="w-[40%] bg-blue-950 hover:bg-blue-900" type="button" onClick={() => vm.handleDuplicate(todo.TodoID)}>コピー</Button>
                                    <Button className="w-[40%] bg-blue-950 hover:bg-blue-900" type="button" onClick={() => vm.handleDelete(todo.TodoID)}>削除</Button>
                                </div>
                            </div>
                            <div className="flex my-2">
                                <p className="text-[18px]">Due date：</p>
                                <p className="text-[18px]">{todo.DueDate?.Value() ? todo.DueDate.Value()?.toISOString().split("T")[0] : "未設定"}</p>
                            </div>
                            <div className="flex items-center">
                                <p>Completed：</p>
                                <Input className="w-6 h-6 mr-10" type="checkbox" checked={ todo.CompletedAt?.Value() != null } onChange={() => vm.handleComplete(todo.TodoID)}></Input>
                                <p>At：</p>
                                <p>{todo.CompletedAt ? todo.CompletedAt.Value()?.toISOString().split("T")[0] : "未完了"}</p>
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