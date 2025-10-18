import React, { useState } from "react";
import { Create } from "../../../interface/TodoController";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Body, DueDate, Title } from "@/domain/valueObject";
import { useNavigate } from "react-router";

export const CreateForm = ({reroad, closeModal}:{reroad: React.Dispatch<React.SetStateAction<boolean>>; closeModal: () => void;}) => {

    const [tError, setTError] = useState("");
    const [bError, setBError] = useState("");
    const [dError, setDError] = useState("");
    const navigate = useNavigate();
    
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string | undefined>();
    const [dueDate, setDueDate] = useState<Date | undefined>();

    const createSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.length < 1) {
            setTError("タイトルは必須です")
            return;
        }
        try {
            await Create(title, body, dueDate)
        } catch (err: any) {
            console.error("ERR:", err);
            setTError(err.message || "セッションが切れました。ログインしなおしてください")
            if (err.message?.includes("セッション")) {
                navigate("/", {state: {msg: "セッションが切れました"}})
                return;
            }
        }
        setTitle("");
        setBody(undefined);
        setDueDate(undefined); 
        reroad(prev => !prev);
        closeModal();
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
                setDueDate(input);
                setDError("");
            } catch (err: any) {
                setDError(err.message);
            }
    }

    return(
        <div className="w-[90%] mx-auto">
                        <form className="" onSubmit={createSubmit}>
                            {tError && (
                                <p className="pt-5 text-red-500">{tError}</p>
                            )}
                            {bError && (
                                <p className="pt-5 text-red-500">{bError}</p>
                            )}
                            {dError && (
                                <p className="pt-5 text-red-500">{dError}</p>
                            )}
                            <h1 className="pt-5 mb-2 pl-1 font-bold text-blue-800">Title</h1>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="タイトル(必須)" value={title} onChange={(e) => inputTitle(e.target.value)}></Input>

                            <h1 className="pt-5 mb-2 pl-1 font-bold text-blue-800">About</h1>
                            <Textarea placeholder="説明" className="resize-none h-30 border-0 border-l-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={body ? body : ""} onChange={(e) => inputBody(e.target.value)}></Textarea>
                            <h1 className="pt-5 pl-1 mb-2 font-bold text-blue-800">DueDate</h1>
                            <Input type="date" className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={dueDate ? dueDate.toISOString().split("T")[0] : ""} onChange={(e) => inputDueDate(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                            <Button type="submit" className="bg-blue-950 hover:bg-blue-900 mt-10 mb-4 mx-auto w-[80%] block">todo作成</Button>
                        </form>
        </div>
    )
}