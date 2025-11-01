import React, { useEffect, useState, useRef } from "react"
import { Login } from "../../interface/UserController";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LogIn = () => {
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


    return (
        <>
            <div className="w-[60%] mx-auto my-5">
                <h1 className="text-[30px] font-medium text-blue-900">ログイン</h1>

                {error && (
                    <p className="pt-4 text-red-500">{error}</p>
                )}

                {message && (
                    <div className="text-red-500"> {message} </div>
                )}

                {wait && (
                    <div className=""> {wait} </div>
                )}

                <div>
                    <form onSubmit={handleSubmit} className="pt-10">
                        <div>
                            <p className="text-xs">メールアドレス</p>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
                                              type="text" value={email} onChange = {(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="pt-10">
                            <p className="text-xs">パスワード</p>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent"  
                                              type="text" value={viewPassword} onChange = {(e) => handlePassword(e.target.value)} />
                        </div>
                        
                        <Button className="mt-10 w-3/4 md:w-2/3 lg:w-4/7 mx-auto block bg-blue-800
                                          hover:bg-blue-700" 
                                          type="submit">Log in</Button>
                    </form>
                </div>
                <div className="h-8 mt-7 flex items-cneter justify-center my-6 ">
                    <div className="flex-1 h-[5%] bg-blue-900 my-auto"></div>
                    <span className="mx-4 text-blue-900 my-auto">または</span>
                    <div className="flex-1 h-[5%] bg-blue-900 my-auto"></div>
                </div>
                <Button className="mt-7 w-3/4 md:w-2/3 lg:w-4/7 mx-auto block bg-blue-400
                                   hover:bg-blue-500" 
                                  onClick={() => navigate("/signup")}>Sign up</Button>
            </div>
        </>
    )
}