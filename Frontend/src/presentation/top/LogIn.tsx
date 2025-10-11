import React, { useState } from "react"
import { Login } from "../../interface/UserController";
import { useNavigate } from "react-router";

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = await Login(email, rawPassword);
        localStorage.setItem("token", token);
        window.location.href = "/home";
    }
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" value={email} onChange = {(e) => setEmail(e.target.value)} />
                <input className="rawPassword" type="text" value={rawPassword} onChange = {(e) => setRawPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
        </>
    )
}