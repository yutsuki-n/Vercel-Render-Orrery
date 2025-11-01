import { useState } from "react";
import { useNavigate } from "react-router";

export const headerVM = () => {
    const token = localStorage.getItem("token");

    const [userModalOpen, setUserModalOpen] = useState(false);
    const [userModalStatus, setUserModalStatus] = useState("ユーザー")
    const handleUserModal = () => {
        setUserModalOpen(prev => !prev)
        if (userModalOpen) {
            setUserModalStatus("ユーザー")
        } else {
            setUserModalStatus("閉じる")
        }
    };

    const navigate = useNavigate();

    const transEdit = () => {
        handleUserModal();
        navigate("/edit");
    }

    const transDelete = () => {
        handleUserModal();
        navigate("/withdraw");
    }

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/"
    }

    return {
        token,
        userModalOpen,
        userModalStatus,
        handleUserModal,
        transEdit,
        transDelete,
        handleLogout
    }
}