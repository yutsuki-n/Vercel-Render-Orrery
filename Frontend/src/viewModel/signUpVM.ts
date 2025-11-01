import { Register } from "@/interface/UserController";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useSignUpVM = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const [viewPassword, setViewPassword] = useState("");
    const [error, setError] = useState("");
    const [wait, setWait] = useState("");
    const navigate = useNavigate();

    const maskTimerRef = useRef<number | null>(null);
    
    const handlePassword = (input: string) => {
        if (maskTimerRef.current) {
            clearTimeout(maskTimerRef.current);
        }

        if(input.length > viewPassword.length) {
            const addedChar = input.slice(viewPassword.length);
            setViewPassword(prev => {
                if (!prev) {
                    return addedChar;
                } else {
                    return prev.slice(0, -1) + "●" + addedChar;
                }
            });
            setRawPassword(prev => prev + addedChar);
            
            maskTimerRef.current = setTimeout(() => {
                setViewPassword(prev => {
                        return prev.slice(0, -1) + "●";
                })
            }, 3000);

        } else {
            setViewPassword(prev => prev.slice(0, -1));
            setRawPassword(prev => prev.slice(0, -1));
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("");
        setWait("now loading");
        try {
            const token = await Register(email, rawPassword);
            
            if (!token) throw new Error("アカウント作成に失敗しました");
            
            const expiry = new Date().getTime() + 3 * 60 * 60 * 1000;

            localStorage.setItem("token",token);
            localStorage.setItem("token_expiry",expiry.toString());

            window.location.href = "/home";                    
        } catch (err: any) {
            setError(err.message || "ログインに失敗しました")
        }
        await setWait("");
    }

    return {
        error,
        wait,
        handleSubmit,
        email,
        setEmail,
        viewPassword,
        handlePassword,
        navigate,
    }
}