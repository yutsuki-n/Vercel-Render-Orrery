import React, { useEffect, useState } from "react"
import { Login } from "../../interface/UserController";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string | null>(null)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.msg) {
            setMessage(location.state.msg);
            navigate(location.pathname, { replace: true});
        }
    }, [location, navigate]);
    
    useEffect(() => {
        ( async () => await localStorage.removeItem("token")) ();
    },[])    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("");
        

        try {
            const token = await Login(email, rawPassword);
            
            if (!token) throw new Error("メールアドレス、またはパスワードが間違っています");

            localStorage.setItem("token", token);
            window.location.href = "/home";
        } catch (err: any) {
            setError(err.message || "ログインに失敗しました")
        }
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
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent"  type="text" value={rawPassword} onChange = {(e) => setRawPassword(e.target.value)} />
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