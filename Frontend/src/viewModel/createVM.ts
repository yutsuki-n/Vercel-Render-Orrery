import { Title, Body, DueDate } from "@/domain/valueObject";
import { Create } from "@/interface/TodoController";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useCreateVM = ({reroad, closeModal}:{reroad: React.Dispatch<React.SetStateAction<boolean>>; closeModal: () => void;}) => {
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
            if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
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

    return {
        createSubmit,
        tError,
        bError,
        dError,
        title,
        inputTitle,
        body,
        inputBody,
        dueDate,
        inputDueDate,
    }
}