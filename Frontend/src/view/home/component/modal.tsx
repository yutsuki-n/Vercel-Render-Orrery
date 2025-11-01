import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateForm } from "./createTodo";
import { useState } from "react";

export const CreateModal = ({reroad}:{reroad: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="w-[90%] mx-auto">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-blue-950 hover:bg-blue-900 w-[40%]">Todo作成</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader className="w-[90%] mx-auto pt-3">
                        <DialogTitle className="w-full mx-auto text-blue-800">Todo作成</DialogTitle>
                        <DialogDescription>
                            忘れないように
                        </DialogDescription>
                    </DialogHeader>

                    <div>
                        <CreateForm reroad={reroad} closeModal={() => setOpen(false)}></CreateForm>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}