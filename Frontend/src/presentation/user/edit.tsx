import { useState } from "react"
import { Edit } from "../../interface/UserController"
import { useNavigate } from "react-router"


export const EditProfile = () => {
    const [oldEmail, setOldEmail] = useState<string>("")
    const [oldRawPassword, setOldRawPassword] = useState<string>("")
    const [newEmail, setNewEmail] = useState<string>("")
    const [newRawPassword, setNewRawPassword] = useState<string>("")

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("from edit", newEmail, newRawPassword)
        const token = await Edit(oldEmail, oldRawPassword, newEmail, newRawPassword)
        localStorage.setItem("token", token);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="mail" placeholder="現在のメールアドレス(必須)" value={oldEmail} onChange={(e)=>setOldEmail(e.target.value)}></input>
                <input className="password" placeholder="現在のパスワード(必須)" value={oldRawPassword} onChange={(e)=>setOldRawPassword(e.target.value)}></input>
                <br/>
                <input className="mail" placeholder="新しいメールアドレス(任意)" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}></input>
                <input className="password" placeholder="新しいパスワード(任意)" value={newRawPassword} onChange={(e)=>setNewRawPassword(e.target.value)}></input>
                <br/>
                <button type="submit">更新</button>
            </form>
            <button onClick={() => navigate("/home")}>変更せずに戻る</button>
        </>
    )
}