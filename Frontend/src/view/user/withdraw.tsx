import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWithdrawVM } from "@/viewModel/withdrawVM"

export const WithdrawApp = () => {
    const vm = useWithdrawVM();

    return(
        <div className="w-[90%] mx-auto">
            <div className="flex justify-end">
                <Button className="w-[30%] bg-blue-950 hover:bg-blue-900" onClick={() => vm.navigate("/home")}>戻る</Button>
            </div>
            <form  onSubmit={vm.handleDelete}>
                {vm.error && (
                    <p className="top-20 text-red-500">{vm.error}</p>
                )}
                <p className="my-4 text-[20px] text-blue-800 font-bold mb-10">アカウント削除</p>
                <p className="text-xs">メールアドレス</p>
                <Input className="mb-3 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="メールアドレス(必須)" value={vm.email} onChange={(e) => vm.setEmail(e.target.value)}></Input>
                <p className="text-xs">パスワード</p>
                <Input className="mb-10 border-0 border-b-2 border-gray-400 
                                                focus:border-blue-700 rounded-none 
                                                shadow-none focus:outline-none focus-visible:ring-0
                                                focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" placeholder="パスワード(必須)" value={vm.viewPassword} onChange={(e) => vm.handlePassword(e.target.value)}></Input>
                <Button className="w-[60%] mx-auto block bg-blue-950 hover:bg-blue-900" type="submit">アカウント削除</Button>
            </form>
        </div>
    )    
}