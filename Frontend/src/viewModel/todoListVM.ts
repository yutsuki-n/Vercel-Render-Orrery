import { Delete, Duplicate, Toggle } from "@/interface/TodoController";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useTodoListVM = ({reroad}:{reroad:React.Dispatch<React.SetStateAction<boolean>>;}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleComplete = async (id: string) => {
        try {
            await Toggle(id)
            await new Promise(resolve => setTimeout(resolve, 100));
            reroad(prev =>!prev);
        } catch (err: any) {
            setError(err.message || "セッションが切れました")
            if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
                navigate("/", {state: {msg: "セッションが切れました"}});
            }
        }
    }

    const handleDuplicate = async (id: string) => {
        try {
            await Duplicate(id)
            await new Promise(resolve => setTimeout(resolve, 100));
            reroad(prev => !prev);
        } catch (err: any) {
            setError(err.message || "セッションが切れました")
            if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
                navigate("/", {state: {msg: "セッションが切れました"}});
            }
        }
    }

    const handleDelete = async (id: string) => {
        const check = window.confirm("本当に削除しますか？");
        if (check) {
            try {
                await Delete(id);
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (err: any) {
                setError(err.message || "セッションが切れました")
                if (err.message?.includes("セッション") || err.message?.includes("トークン")) {
                    navigate("/", {state: {msg: "セッションが切れました"}});
                }
            }
        } 
        reroad(prev => !prev);
    }

    return {
        error,
        navigate,
        handleDuplicate,
        handleDelete,
        handleComplete
    }
}