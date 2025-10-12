import { useState } from "react"
import { Edit } from "../../interface/UserController"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export const EditProfile = () => {
    const [oldEmail, setOldEmail] = useState<string>("")
    const [oldRawPassword, setOldRawPassword] = useState<string>("")
    const [newEmail, setNewEmail] = useState<string>("")
    const [error, setError] = useState("");
    const [newRawPassword, setNewRawPassword] = useState<string>("")

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("from edit", newEmail, newRawPassword)
            const token = await Edit(oldEmail, oldRawPassword, newEmail, newRawPassword)
            localStorage.setItem("token", token);
        } catch (err: any) {
            setError(err.message || "ログインに失敗しました")
        }
    }

    return (
        <>
            <div className="flex justify-end w-[90%] mx-auto">
                <Button className="w-[35%] bg-blue-950 hover:bg-blue-900"  onClick={() => navigate("/home")}>変更せずに戻る</Button>
            </div>

            <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
                {error && (
                    <p className="fixed top-20 text-red-500">{error}</p>
                )}
                <div>
                    <p className="text-[20px] my-4 text-blue-800 font-bold">アカウント確認</p>
                    <p className="text-xs">現在のメールアドレス</p>
                    <Input className="mb-3 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="現在のメールアドレス(必須)" value={oldEmail} onChange={(e)=>setOldEmail(e.target.value)}></Input>
                    <p className="text-xs">現在のパスワード</p>
                    <Input className="mb-12 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="現在のパスワード(必須)" value={oldRawPassword} onChange={(e)=>setOldRawPassword(e.target.value)}></Input>
                </div>
                <div>
                    <p className="text-[20px] my-4 text-blue-800 font-bold">変更内容</p>
                    <p className="text-xs">新しいメールアドレス</p>
                    <Input className="mb-3 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="新しいメールアドレス(任意)" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}></Input>
                    <p className="text-xs">新しいパスワード</p>
                    <Input className="mb-10 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="新しいパスワード(任意)" value={newRawPassword} onChange={(e)=>setNewRawPassword(e.target.value)}></Input>
                </div>
                <Button className="w-120 mx-auto block bg-blue-950 hover:bg-blue-900" type="submit">更新</Button>
            </form>
        </>
    )
}