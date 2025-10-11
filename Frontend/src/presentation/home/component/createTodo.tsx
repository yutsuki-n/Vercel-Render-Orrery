import React, { useState } from "react";
import { Create } from "../../../interface/TodoController";


export const CreateModal = ({reroad}:{reroad: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createModalStatus, setCreateModalStatus] = useState("todo作成")
    const handleCreateModal = () => {
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
        await Create(title, body, dueDate)
        setTitle("");
        setBody(undefined);
        setDueDate(undefined); 
        handleCreateModal();
        reroad(prev => !prev);
    }

    return(
        <div>
                {createModalOpen && (
                    <div className="modal">
                        <form onSubmit={createSubmit}>
                            <input placeholder="タイトル(必須)" className="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            <input placeholder="説明" className="body" value={body ? body : ""} onChange={(e) => setBody(e.target.value ? e.target.value : undefined)}></input>
                            <input type="date" className="dueDate" value={dueDate ? dueDate.toISOString().split("T")[0] : ""} onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)}></input>
                            <button type="submit">todo作成</button>
                        </form>
                    </div>
                )}

                <button onClick={handleCreateModal}>{createModalStatus}</button>
            </div>
    )
}