import { Email, RawPassword } from "@/domain/valueObject";
import { UserFetch } from "@/infrastructure/UserFetch";
import { LoginUsecase } from "@/usecase/UserUsecase/Login";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const useLoginVM = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const [viewPassword, setViewPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string | null>(null)
    const [wait, setWait] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.msg) {
            setMessage(location.state.msg);
            navigate(location.pathname, { replace: true});
            setWait("");
        }
    }, [location, navigate]);
    
    useEffect(() => {
        const path = location.pathname;
        if (path === "/login" && location.state?.msg === "セッションが切れました") {
            localStorage.removeItem("token");
        }
    },[location]);    

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

    const token = localStorage.getItem("token");
    const UF = new UserFetch(token);

    const Login = async (email: string, rawPassword: string): Promise<string> => {
        const usecase = new LoginUsecase(UF);
        const inputEmail = new Email(email);
        const inputRawPassword = new RawPassword(rawPassword);

        const token = await usecase.Execute(inputEmail, inputRawPassword);
        return token;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("");
        setMessage("");
        setWait("now loading"); 

        try {
            const token = await Login(email, rawPassword);
            
            if (!token) throw new Error("メールアドレス、またはパスワードが間違っています");

            const expiry = new Date().getTime() + 30 * 60 * 60 * 1000;

            localStorage.setItem("token",token);
            localStorage.setItem("token_expiry", expiry.toString());

            window.location.href = "/home";
        } catch (err: any) {
            setError(err.message || "ログインに失敗しました")
        }
        await setWait("");
    }

    return {
        error,
        message,
        wait,
        handleSubmit,
        email,
        setEmail,
        viewPassword,
        handlePassword,
        navigate,
    }
}