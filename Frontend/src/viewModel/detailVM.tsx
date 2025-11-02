import type { ResTodoDTO } from "@/domain/dto/todoDTO";
import { Body, CompletedAt, DueDate, Title } from "@/domain/valueObject";
import { TodoFetch } from "@/infrastructure/TodoFetch";
import { GetUsecase, UpdateUsecase } from "@/usecase/TodoUsecase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const useDetailVM = () => {
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

    const token = localStorage.getItem("token");
    const TF = new TodoFetch(token);

    const Get = async (id: string): Promise<ResTodoDTO> => {
        const usecase = new GetUsecase(TF);

        const todo = await usecase.Execute(id);
        return todo;
    }

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

    const Update = async (id: string, title?: string, body?: string | null, dueDate?: Date | null, completeAt?: Date | null):Promise<void> => {
        const usecase = new UpdateUsecase(TF);
        const inputTitle = title ? new Title(title) : undefined;
        const inputBody = (body === undefined) ? undefined : new Body(body);
        const inputDueDate = (dueDate === undefined) ? undefined : DueDate.NewDueDate(dueDate);
        const inputCompletedAt = (completeAt === undefined) ? undefined : new CompletedAt(completeAt);

        console.log("from controller", id, inputTitle, inputBody, inputDueDate, inputCompletedAt);
        await usecase.Execute(id, inputTitle, inputBody, inputDueDate, inputCompletedAt);
    }

    const updateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return <p>不正なアクセスです</p>

        try {
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

    return {
        useEffect,
        id,todo,title,body,dueDate,completedAt,
        error,tError,bError,dError,cError,
        inputTitle,inputBody,inputDueDate,inputCompletedAt,
        updateSubmit,
        navigate,
    };
};

