import React, { useEffect, useState } from "react";
import type { ResTodoDTO } from "../../../domain/dto/todoDTO";
import { List } from "../../../interface/TodoController";


export const Search = ({reroad,reroadToggle,setTodos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; reroadToggle:boolean; setTodos:React.Dispatch<React.SetStateAction<ResTodoDTO[]>>;}) => {


    //検索機能系
    const [searchString, setSearchString] = useState<string | undefined>();
    //titleとbodyの別検索も可能だが、その場合はOR検索を修正する
    const [searchDueDateFrom, setSearchDueDateFrom] = useState<Date | undefined>();
    const [searchDueDateTo, setSearchDueDateTo] = useState<Date | undefined>();
    const [searchCompleted, setSearchCompleted] = useState<boolean | undefined>();
    
    const searchSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            reroad(prev => !prev);
        }

    useEffect( () => {
        (async () => {const todolist = await List(searchString, searchString, searchDueDateFrom, searchDueDateTo, searchCompleted);
        //TodoとBodyを分けるときにはGormの改変も行うこと
        setTodos(todolist);}) ();
    }, [reroadToggle] );

    return (
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


    )
}