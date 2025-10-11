import React, { useState } from "react"
import { Delete } from "../../interface/UserController";
import { useNavigate } from "react-router";

export const WithdrawApp = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const navigate = useNavigate();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        await Delete(email, rawPassword);
        window.location.href = "/login";
    }

    return(
        <>
            <form onSubmit={handleDelete}>
                <input className="email" placeholder="メールアドレス(必須)" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className="rawPassword" placeholder="パスワード(必須)" value={rawPassword} onChange={(e) => setRawPassword(e.target.value)}></input>
                <button type="submit">アカウント削除</button>
            </form>
            <button onClick={() => navigate("/home")}>戻る</button>
        </>
    )    
}