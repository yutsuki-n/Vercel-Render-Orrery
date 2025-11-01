import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { useCreateVM } from "@/viewModel/createVM";

export const CreateForm = ({reroad, closeModal}:{reroad: React.Dispatch<React.SetStateAction<boolean>>; closeModal: () => void;}) => {
    const vm = useCreateVM({reroad,closeModal})
    return(
        <div className="w-[90%] mx-auto">
                        <form className="" onSubmit={vm.createSubmit}>
                            {vm.tError && (
                                <p className="pt-5 text-red-500">{vm.tError}</p>
                            )}
                            {vm.bError && (
                                <p className="pt-5 text-red-500">{vm.bError}</p>
                            )}
                            {vm.dError && (
                                <p className="pt-5 text-red-500">{vm.dError}</p>
                            )}
                            <h1 className="pt-5 mb-2 pl-1 font-bold text-blue-800">Title</h1>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="タイトル(必須)" value={vm.title} onChange={(e) => vm.inputTitle(e.target.value)}></Input>

                            <h1 className="pt-5 mb-2 pl-1 font-bold text-blue-800">About</h1>
                            <Textarea placeholder="説明" className="resize-none h-30 border-0 border-l-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={vm.body ? vm.body : ""} onChange={(e) => vm.inputBody(e.target.value)}></Textarea>
                            <h1 className="pt-5 pl-1 mb-2 font-bold text-blue-800">DueDate</h1>
                            <Input type="date" className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" value={vm.dueDate ? vm.dueDate.toISOString().split("T")[0] : ""} onChange={(e) => vm.inputDueDate(e.target.value ? new Date(e.target.value) : undefined)}></Input>
                            <Button type="submit" className="bg-blue-950 hover:bg-blue-900 mt-10 mb-4 mx-auto w-[80%] block">todo作成</Button>
                        </form>
        </div>
    )
}