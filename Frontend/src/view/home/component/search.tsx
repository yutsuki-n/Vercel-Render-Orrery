import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchVM } from "@/viewModel/searchVM";
import type { Todo } from "@/domain/entity/todo";

export const Search = ({reroad,reroadToggle,setTodos}: {reroad:React.Dispatch<React.SetStateAction<boolean>>; reroadToggle:boolean; setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;}) => {
    const vm = useSearchVM({reroad,reroadToggle,setTodos});

    return (
        <div>
            <form className="mt-8 w-[90%] mx-auto mb-15" onSubmit={vm.searchSubmit}>
                    <h1 className="text-[25px] text-blue-800">Search</h1>     
                        <div className="flex justify-between">
                            <Input placeholder="キーワード" className="w-[45%] border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={vm.searchString ? vm.searchString : ""} onChange={(e) => vm.setSearchString(e.target.value ? e.target.value : undefined)}></Input>
                            <div className="flex justify-between w-[45%] mr-0">
                                <Button className="w-[45%] bg-blue-950 hover:bg-blue-900" type="submit">search</Button>
                                <Button className="w-[45%] bg-blue-950 hover:bg-blue-900" type="button" onClick={vm.handleclear}>clear</Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mt-10 w-[55%]">
                                <p className="mb-2">Due date</p>
            
                                <div className="flex justify-between items-center">
                                    <div className="w-[45%]">
                                        <p>From</p>
                                        <Input type="date" className="border-0 border-b-2 border-gray-400 
                                                            focus:border-blue-700 rounded-none 
                                                            shadow-none focus:outline-none focus-visible:ring-0
                                                            focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={vm.searchDueDateFrom ? vm.searchDueDateFrom?.toISOString().split("T")[0] : ""} onChange={(e) => vm.setSearchDueDateFrom(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                                    </div>
                                    <div className="w-[45%]">
                                        <p>To</p>
                                        <Input type="date" className="border-0 border-b-2 border-gray-400 
                                                        focus:border-blue-700 rounded-none 
                                                        shadow-none focus:outline-none focus-visible:ring-0
                                                        focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={vm.searchDueDateTo ? vm.searchDueDateTo.toISOString().split("T")[0] : ""} onChange={(e) => vm.setSearchDueDateTo(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[25%] mx-auto pt-10 justify-between">
                                <div>
                                    <p className="mx-auto">完了</p>
                                    <Input type="checkbox" className="mx-auto w-7 h-7 border-0 border-b-2 border-gray-400 
                                                        focus:border-blue-700 rounded-none 
                                                        shadow-none focus:outline-none focus-visible:ring-0
                                                        focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" checked={ vm.searchCompleted === true } onChange={() => vm.setSearchCompleted(prev => (prev === true ? undefined : true))}></Input>
                                </div>
                                <div>
                                    <p className="mx-auto">未完了</p>
                                    <Input type="checkbox" className="mx-auto w-7 h-7 border-0 border-b-2 border-gray-400 
                                                        focus:border-blue-700 rounded-none 
                                                        shadow-none focus:outline-none focus-visible:ring-0
                                                        focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" checked={ vm.searchCompleted === false } onChange={() => vm.setSearchCompleted(prev => (prev === false ? undefined : false))}></Input>
                                </div>
                            </div>
                        </div>
                        {vm.error && (
                            <p className="pt-5 text-red-500">{vm.error}</p>
                        )}
                </form>
        </div>
    )
}