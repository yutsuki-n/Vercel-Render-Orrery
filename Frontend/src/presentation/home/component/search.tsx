import React, { useEffect, useState } from "react";
import type { ResTodoDTO } from "../../../domain/dto/todoDTO";
import { List } from "../../../interface/TodoController";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

export const Search = ({reroad,reroadToggle,setTodos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; reroadToggle:boolean; setTodos:React.Dispatch<React.SetStateAction<ResTodoDTO[]>>;}) => {


    //検索機能系
    const [searchString, setSearchString] = useState<string | undefined>();
    //titleとbodyの別検索も可能だが、その場合はOR検索を修正する
    const [searchDueDateFrom, setSearchDueDateFrom] = useState<Date | undefined>();
    const [searchDueDateTo, setSearchDueDateTo] = useState<Date | undefined>();
    const [searchCompleted, setSearchCompleted] = useState<boolean | undefined>();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const searchSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            reroad(prev => !prev);
        }

    const handleclear = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchString(undefined);
        setSearchDueDateFrom(undefined);
        setSearchDueDateTo(undefined);
        setSearchCompleted(undefined);
        reroad(prev => !prev) 
    }

    useEffect( () => {
            (async () => { try {const todolist = await List(searchString, searchString, searchDueDateFrom, searchDueDateTo, searchCompleted);
                //TodoとBodyを分けるときにはGormの改変も行うこと
                setTodos(todolist);
            } catch (err: any) {
                setError(err.message || "ログインに失敗しました")
                if (err.message?.includes("セッション")) {
                    navigate("/", { state: { msg: "セッションが切れました"} });
                }
            }}) ();
    }, [reroadToggle] );

    return (
        <div>
            <form className="mt-8 w-[90%] mx-auto mb-15" onSubmit={searchSubmit}>
                    <h1 className="text-[25px] text-blue-800">Search</h1>     
                        <div className="flex justify-between">
                            <Input placeholder="キーワード" className="w-[45%] border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={searchString ? searchString : ""} onChange={(e) => setSearchString(e.target.value ? e.target.value : undefined)}></Input>
                            <div className="flex justify-between w-[45%] mr-0">
                                <Button className="w-[45%] bg-blue-950 hover:bg-blue-900" type="submit">search</Button>
                                <Button className="w-[45%] bg-blue-950 hover:bg-blue-900" type="button" onClick={handleclear}>clear</Button>
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
                                                            focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={searchDueDateFrom ? searchDueDateFrom?.toISOString().split("T")[0] : ""} onChange={(e) => setSearchDueDateFrom(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                                    </div>
                                    <div className="w-[45%]">
                                        <p>To</p>
                                        <Input type="date" className="border-0 border-b-2 border-gray-400 
                                                        focus:border-blue-700 rounded-none 
                                                        shadow-none focus:outline-none focus-visible:ring-0
                                                        focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={searchDueDateTo ? searchDueDateTo.toISOString().split("T")[0] : ""} onChange={(e) => setSearchDueDateTo(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[25%] mx-auto pt-10 justify-between">
                                <div>
                                    <p className="mx-auto">完了</p>
                                    <Input type="checkbox" className="mx-auto w-7 h-7 border-0 border-b-2 border-gray-400 
                                                        focus:border-blue-700 rounded-none 
                                                        shadow-none focus:outline-none focus-visible:ring-0
                                                        focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" checked={ searchCompleted === true } onChange={() => setSearchCompleted(prev => (prev === true ? undefined : true))}></Input>
                                </div>
                                <div>
                                    <p className="mx-auto">未完了</p>
                                    <Input type="checkbox" className="mx-auto w-7 h-7 border-0 border-b-2 border-gray-400 
                                                        focus:border-blue-700 rounded-none 
                                                        shadow-none focus:outline-none focus-visible:ring-0
                                                        focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" checked={ searchCompleted === false } onChange={() => setSearchCompleted(prev => (prev === false ? undefined : false))}></Input>
                                </div>
                            </div>
                        </div>
                        {error && (
                            <p className="pt-5 text-red-500">{error}</p>
                        )}
                </form>
        </div>


    )
}