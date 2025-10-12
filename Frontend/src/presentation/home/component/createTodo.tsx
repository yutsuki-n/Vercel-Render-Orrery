import React, { useState } from "react";
import { Create } from "../../../interface/TodoController";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 

export const CreateModal = ({reroad}:{reroad: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createModalStatus, setCreateModalStatus] = useState("todo作成")
    const [error, setError] = useState("");
    const handleCreateModal = () => {
        setError("");
        setCreateModalOpen(prev => !prev)
        if (createModalOpen) {
            setCreateModalStatus("todo作成")
        } else {
            setCreateModalStatus("閉じる")
        }
    }
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string | undefined>();
    const [dueDate, setDueDate] = useState<Date | undefined>();

    const createSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await Create(title, body, dueDate)
            setTitle("");
            setBody(undefined);
            setDueDate(undefined); 
            handleCreateModal();
            reroad(prev => !prev);
        } catch (err: any) {
            setError(err.message || "ログインに失敗しました")
        }
    }

    return(
        <div className="w-[90%] mx-auto">
                <Button className="float-right w-50 bg-blue-950 hover:bg-blue-900" onClick={handleCreateModal}>{createModalStatus}</Button>
                {createModalOpen && (
                        <form className="" onSubmit={createSubmit}>
                            <Button type="submit" className="bg-blue-950 hover:bg-blue-900">todo作成</Button>
                            {error && (
                                <p className="pt-5 text-red-500">{error}</p>
                            )}
                            <h1 className="pt-5 mb-2 pl-1 font-bold text-blue-800">Title</h1>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="タイトル(必須)" value={title} onChange={(e) => setTitle(e.target.value)}></Input>

                            <h1 className="pt-5 mb-2 pl-1 font-bold text-blue-800">About</h1>
                            <Textarea placeholder="説明" className="resize-none h-30 border-0 border-l-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={body ? body : ""} onChange={(e) => setBody(e.target.value ? e.target.value : undefined)}></Textarea>
                            <h1 className="pt-5 pl-1 mb-2 font-bold text-blue-800">DueDate</h1>
                            <Input type="date" className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={dueDate ? dueDate.toISOString().split("T")[0] : ""} onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                        </form>
                )}

        </div>
    )
}