import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Header = () => {
    
    const token = localStorage.getItem("token");

    const [userModalOpen, setUserModalOpen] = useState(false);
    const [userModalStatus, setUserModalStatus] = useState("ユーザー")
    const navigate = useNavigate();
    const handleUserModal = () => {
        setUserModalOpen(prev => !prev)
        if (userModalOpen) {
            setUserModalStatus("ユーザー")
        } else {
            setUserModalStatus("閉じる")
        }
    };

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
        window.location.href = "/login"
    }

    return(
        <header className="stycky top-0 z-20 bg-blue-900 text-white 
                           h-15 items-center mb-8">

            <div className="h-15 flex justify-between w-[90%] mx-auto items-center">    
                { token ? null :
                    <div className="text-[22px]" >
                        Orrary
                    </div>
                     
                }
                
                { token &&
                    <>
                        <div className="cursor-pointer text-[22px]" onClick={() => window.location.href="/home"} >
                            Orrary
                        </div>
                        <div className="w-[50%] flex justify-end">
                            <div className="flex">
                                {userModalOpen && (
                                    <>
                                        <Button className="mr-1 bg-blue-900 shadow-none hover:bg-blue-700" onClick={transEdit}>変更</Button>
                                        <Button className="mr-3 bg-blue-900 shadow-none hover:bg-blue-700" onClick={transDelete}>削除</Button>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-between w-[60%]">    
                                <Button className="text-[11px] sm:text-sm w-[45%] bg-blue-900 shadow-none hover:bg-blue-700" onClick={handleUserModal}>{userModalStatus}</Button>
                                <Button className="text-[10px] sm:text-sm w-[45%] bg-blue-900 shadow-none hover:bg-blue-700" onClick={handleLogout}>ログアウト</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </header>
    )
}