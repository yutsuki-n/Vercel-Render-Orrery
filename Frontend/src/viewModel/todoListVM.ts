import { User } from "@/domain/entity/user";
import { TodoFetch } from "@/infrastructure/TodoFetch";
import { DeleteUsecase, DuplicateUsecase, ToggleUsecase } from "@/usecase/TodoUsecase";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useTodoListVM = ({reroad}:{reroad:React.Dispatch<React.SetStateAction<boolean>>;}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const TF = new TodoFetch(User.getToken());

    const Toggle = async (id: string): Promise<void> => {
        const usecase = new ToggleUsecase(TF);
        await usecase.Execute(id);
    }

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

    const Duplicate = async (id: string):Promise<void> => {
        const usecase = new DuplicateUsecase(TF);

        await usecase.Execute(id);
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

    const Delete = async (id: string):Promise<void> => {
        const usecase = new DeleteUsecase(TF);

        await usecase.Execute(id);
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