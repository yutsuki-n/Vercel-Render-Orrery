import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { List } from "../../../interface/TodoController";
import type { ResTodoDTO } from "../../../domain/dto/todoDTO";

export const listSearch = () => {
    const [todos, setTodos] = useState<ResTodoDTO[]>([]);
    const [searchString, setSearchString] = useState<string | undefined>();
    const [searchDueDateFrom, setSearchDueDateFrom] = useState<Date | undefined>();
    const [searchDueDateTo, setSearchDueDateTo] = useState<Date | undefined>();
    const [searchCompleted, setSearchCompleted] = useState<boolean | undefined>();
    const [searchInput, setSearchInput] = useState<{} | undefined>(undefined);
    const navigate = useNavigate();
    
    const searchSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            setSearchInput({searchString, searchDueDateFrom, searchDueDateTo, searchCompleted})
          }

    useEffect( () => {
        (async () => {const todolist = await List(searchString, searchString, searchDueDateFrom, searchDueDateTo, searchCompleted);
        setTodos(todolist);}) ();
    }, [searchInput] )

    return (
        <>
            <form onSubmit={searchSubmit}>
                <input className="title" value={searchString ? searchString : ""} onChange={(e) => setSearchString(e.target.value ? e.target.value : undefined)}></input>
                <input type="date" className="dueDateFrom" value={searchDueDateFrom ? searchDueDateFrom?.toISOString().split("T")[0] : ""} onChange={(e) => setSearchDueDateFrom(e.target.value ? new Date(e.target.value) : undefined)}></input>
                <input type="date" className="dueDateTo" value={searchDueDateTo ? searchDueDateTo.toISOString().split("T")[0] : ""} onChange={(e) => setSearchDueDateTo(e.target.value ? new Date(e.target.value) : undefined)}></input>
                <input type="checkbox" className="completed" checked={ searchCompleted === true } onChange={() => setSearchCompleted(prev => (prev === true ? undefined : true))}></input>
                <input type="checkbox" className="completed" checked={ searchCompleted === false } onChange={() => setSearchCompleted(prev => (prev === false ? undefined : false))}></input>
                <button type="submit">検索</button>
            </form>
            <form>
                <button onClick={() => navigate("/create")}>作成</button>
            </form>
        </>
    )
}