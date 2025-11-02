import type { ResTodoDTO } from "@/domain/dto/todoDTO";
import { Body, DueDate, Title } from "@/domain/valueObject";
import { TodoFetch } from "@/infrastructure/TodoFetch";
import { ListUsecase } from "@/usecase/TodoUsecase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useSearchVM = ({reroad,reroadToggle,setTodos}:{reroad:React.Dispatch<React.SetStateAction<boolean>>; reroadToggle:boolean; setTodos:React.Dispatch<React.SetStateAction<ResTodoDTO[]>>;}) => {
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

    const token = localStorage.getItem("token");
    const TF = new TodoFetch(token);

    const List = async (title?: string, body?: string, dueDateFrom?: Date, dueDateTo?: Date, completed?: boolean):Promise<ResTodoDTO[]> =>{
        
        console.log("from controller",title, body, dueDateFrom, dueDateTo,completed)
        const usecase = new ListUsecase(TF)
        const inputTitle = title ? new Title(title) : undefined;
        const inputBody = body ? new Body(body) : undefined;
        const inputFrom = dueDateFrom ? DueDate.FromExisting(dueDateFrom) : undefined;
        const inputTo = dueDateTo ? DueDate.FromExisting(dueDateTo) : undefined;

        console.log("from controller2",inputTitle, inputBody, inputFrom, inputTo)
        const todos = await usecase.Execute(inputTitle, inputBody, inputFrom, inputTo, completed);
        return todos;
    }

    useEffect( () => {
            (async () => { 
                const now = Date.now();
                const expiry = localStorage.getItem("token_expiry");
                if (now > Number(expiry)) {
                    navigate("/", { state: { msg: "セッションが切れました"} });
                }
                try {const todolist = await List(searchString, searchString, searchDueDateFrom, searchDueDateTo, searchCompleted);
                //TodoとBodyを分けるときにはGormの改変も行うこと
                setTodos(todolist);
            } catch (err: any) {

                setError(err.message || "ログインに失敗しました")
                if (err.message?.includes("セッション") || err.message?.includes("トークン") || now > Number(expiry)) {
                    navigate("/", { state: { msg: "セッションが切れました"} });
                }
            }}) ();
    }, [reroadToggle] );

    return {
        searchSubmit,
        searchString,
        setSearchString,
        handleclear,
        searchDueDateFrom,
        setSearchDueDateFrom,
        searchDueDateTo,
        setSearchDueDateTo,
        searchCompleted,
        setSearchCompleted,
        error,
    }
}