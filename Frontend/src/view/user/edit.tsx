import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEditVM } from "@/viewModel/editVM"


export const EditProfile = () => {
    const vm = useEditVM();
    return (
        <>
            <div className="flex justify-end w-[90%] mx-auto">
                <Button className="w-[35%] bg-blue-950 hover:bg-blue-900"  onClick={() => vm.navigate("/home")}>変更せずに戻る</Button>
            </div>

            <form className="w-[90%] mx-auto" onSubmit={vm.handleSubmit}>
                {vm.error && (
                    <p className="top-20 text-red-500">{vm.error}</p>
                )}
                <div>
                    <p className="text-[20px] my-4 text-blue-800 font-bold">アカウント確認</p>
                    <p className="text-xs">現在のメールアドレス</p>
                    <Input className="mb-3 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="現在のメールアドレス(必須)" value={vm.oldEmail} onChange={(e)=>vm.setOldEmail(e.target.value)}></Input>
                    <p className="text-xs">現在のパスワード</p>
                    <Input className="mb-12 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="現在のパスワード(必須)" value={vm.viewOldPassword} onChange={(e)=>vm.handleOldPassword(e.target.value)}></Input>
                </div>
                <div>
                    <p className="text-[20px] my-4 text-blue-800 font-bold">変更内容</p>
                    <p className="text-xs">新しいメールアドレス</p>
                    <Input className="mb-3 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="新しいメールアドレス(任意)" value={vm.newEmail} onChange={(e)=>vm.setNewEmail(e.target.value)}></Input>
                    <p className="text-xs">新しいパスワード</p>
                    <Input className="mb-10 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="新しいパスワード(任意)" value={vm.viewNewPassword} onChange={(e)=>vm.handleNewPassword(e.target.value)}></Input>
                </div>
                <Button className="w-[60%] mx-auto block bg-blue-950 hover:bg-blue-900" type="submit">更新</Button>
            </form>
        </>
    )
}