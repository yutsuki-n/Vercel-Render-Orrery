import React, { useState } from "react"
import { Login } from "../interface/UserController";

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        Login(email, rawPassword);
    }
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="email" type="text" value={email} onChange = {(e) => setEmail(e.target.value)} />
                <input className="rawPassword" type="text" value={rawPassword} onChange = {(e) => setRawPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}