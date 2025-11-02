import { User } from "@/domain/entity/user";
import { UserFetch } from "@/infrastructure/UserFetch";
import { WithdrawUsecase } from "@/usecase/UserUsecase/Withdraw";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useWithdrawVM = () => {
    const [email, setEmail] = useState("");
    const [rawPassword, setRawPassword] = useState("");
    const [viewPassword, setViewPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const UF = new UserFetch(User.getToken());

    const Delete = async (email: string, rawPassword: string): Promise<void> => {
        const usecase = new WithdrawUsecase(UF);
        const inputUser = new User(email, rawPassword);

        await usecase.Execute(inputUser);

    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const check = window.confirm("本当に削除しますか？");
        if(check) {
            try {
                await Delete(email, rawPassword);
                window.location.href = "/";
            } catch (err: any) {
                setError(err.message || "セッションが切れました")
            if (err.message === "セッションが切れました") {
                navigate("/login", {state: { msg: "セッションが切れました"}});
            }
            }
        }
    }

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

    return {
        navigate,
        handleDelete,
        error,
        email,
        setEmail,
        viewPassword,
        handlePassword
    }
}
