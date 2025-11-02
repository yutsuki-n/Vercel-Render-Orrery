import { User } from "@/domain/entity/user";
import { Email, RawPassword } from "@/domain/valueObject";
import { UserFetch } from "@/infrastructure/UserFetch";
import { EditUsecase } from "@/usecase/UserUsecase/Edit";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useEditVM = () => {
    const [oldEmail, setOldEmail] = useState<string>("")
    const [oldRawPassword, setOldRawPassword] = useState<string>("")
    const [newEmail, setNewEmail] = useState<string>("")
    const [error, setError] = useState("");
    const [newRawPassword, setNewRawPassword] = useState<string>("")
    const [viewOldPassword, setViewOldPassword] = useState<string>("");
    const [viewNewPassword, setViewNewPassword] = useState<string>("");

    const navigate = useNavigate();

    const UF = new UserFetch(User.getToken());

    const Edit = async (oldEmail: string, oldRawPassword: string, newEmail?: string, newRawPassword?: string): Promise<string> => {
        const usecase = new EditUsecase(UF);
        const inputOldUser = new User(oldEmail, oldRawPassword);
        const inputNewEmail = (newEmail && newEmail != "") ? new Email(newEmail) : undefined;
        const inputNewRawPassword = (newRawPassword && newRawPassword != "") ? new RawPassword(newRawPassword) : undefined;

        console.log("from controller", inputNewEmail, inputNewRawPassword)
        const token = await usecase.Execute(inputOldUser, inputNewEmail, inputNewRawPassword);
        return token;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await Edit(oldEmail, oldRawPassword, newEmail, newRawPassword)
            localStorage.setItem("token", token);
            window.location.href="/home";
        } catch (err: any) {
            setError(err.message || "セッションが切れました")
            if (err.message === "セッションが切れました") {
                navigate("/login", {state: { msg: "セッションが切れました"}});
            }
        }
    }

    const maskTimerRef = useRef<number | null>(null);

    const handleOldPassword = (input: string) => {
        if (maskTimerRef.current) {
            clearTimeout(maskTimerRef.current);
        }

        if(input.length > viewOldPassword.length) {
            const addedChar = input.slice(viewOldPassword.length);
            setViewOldPassword(prev => {
                if (!prev) {
                    return addedChar;
                } else {
                    return prev.slice(0, -1) + "●" + addedChar;
                }
            });
            setOldRawPassword(prev => prev + addedChar);
            
            maskTimerRef.current = setTimeout(() => {
                setViewOldPassword(prev => {
                        return prev.slice(0, -1) + "●";
                })
            }, 3000);

        } else {
            setViewOldPassword(prev => prev.slice(0, -1));
            setOldRawPassword(prev => prev.slice(0, -1));
        }
    }

    const handleNewPassword = (input: string) => {
        if (maskTimerRef.current) {
            clearTimeout(maskTimerRef.current);
        }

        if(input.length > viewNewPassword.length) {
            const addedChar = input.slice(viewNewPassword.length);
            setViewNewPassword(prev => {
                if (!prev) {
                    return addedChar;
                } else {
                    return prev.slice(0, -1) + "●" + addedChar;
                }
            });
            setNewRawPassword(prev => prev + addedChar);
            
            maskTimerRef.current = setTimeout(() => {
                setViewNewPassword(prev => {
                        return prev.slice(0, -1) + "●";
                })
            }, 3000);

        } else {
            setViewNewPassword(prev => prev.slice(0, -1));
            setNewRawPassword(prev => prev.slice(0, -1));
        }
    }

    return {
        navigate,
        handleSubmit,
        error,
        oldEmail,
        setOldEmail,
        viewOldPassword,
        newEmail,
        setNewEmail,
        viewNewPassword,
        handleOldPassword,
        handleNewPassword,
    }
}