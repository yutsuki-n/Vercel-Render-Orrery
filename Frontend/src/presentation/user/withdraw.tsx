import React, { useState } from "react"
import { Delete } from "../../interface/UserController";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const WithdrawApp = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const check = window.confirm("本当に削除しますか？");
        if(check) {
            try {
                await Delete(email, rawPassword);
                window.location.href = "/login";
            } catch (err: any) {
                setError(err.message || "ログインに失敗しました")
            }
        }
    }

    return(
        <div className="w-[90%] mx-auto">
            <div className="flex justify-end">
                <Button className="w-[30%] bg-blue-950 hover:bg-blue-900" onClick={() => navigate("/home")}>戻る</Button>
            </div>
            <form  onSubmit={handleDelete}>
                {error && (
                    <p className="fixed top-20 text-red-500">{error}</p>
                )}
                <p className="my-4 text-[20px] text-blue-800 font-bold mb-10">アカウント削除</p>
                <p className="text-xs">メールアドレス</p>
                <Input className="mb-3 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="メールアドレス(必須)" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <p className="text-xs">パスワード</p>
                <Input className="mb-10 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="パスワード(必須)" value={rawPassword} onChange={(e) => setRawPassword(e.target.value)}></Input>
                <Button className="w-120 mx-auto block bg-blue-950 hover:bg-blue-900" type="submit">アカウント削除</Button>
            </form>
        </div>
    )    
}