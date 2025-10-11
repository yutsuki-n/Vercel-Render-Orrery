import { useState } from "react";
import { useNavigate } from "react-router";


export const UserSettings = () => {
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [userModalStatus, setUserModalStatus] = useState("ユーザー管理")
    const navigate = useNavigate();
    const handleUserModal = () => {
        setUserModalOpen(prev => !prev)
        if (userModalOpen) {
            setUserModalStatus("ユーザー管理")
        } else {
            setUserModalStatus("閉じる")
        }
    };

    return(
        <div>
            {userModalOpen && (
                <div className="modal">
                    <button onClick={() => navigate("/edit")}>変更</button>
                    <button onClick={() => navigate("/withdraw")}>削除</button>
                </div>
            )}
            <button onClick={handleUserModal}>{userModalStatus}</button>
        </div>
    );
}