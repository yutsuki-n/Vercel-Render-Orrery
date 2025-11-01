import { Button } from "@/components/ui/button";
import { useHeaderVM } from "@/viewModel/headerVM";

export const Header = () => {
    const vm = useHeaderVM();

    return(
        <header className="stycky top-0 z-20 bg-blue-900 text-white 
                           h-15 items-center mb-3">

            <div className="h-15 flex justify-between w-[90%] mx-auto items-center">    
                { vm.token ? null :
                    <div className="text-[22px]" >
                        Orrery
                    </div>
                     
                }
                
                { vm.token &&
                    <>
                        <div className="cursor-pointer text-[22px]" onClick={() => window.location.href="/home"} >
                            Orrery
                        </div>
                        
                        <div className="w-[50%] flex justify-end">
                            <div className="flex">
                                {vm.userModalOpen && (
                                    <>
                                        <Button className="mr-1 bg-blue-900 shadow-none hover:bg-blue-700" 
                                            onClick={vm.transEdit}>変更</Button>
                                        <Button className="mr-3 bg-blue-900 shadow-none hover:bg-blue-700" 
                                            onClick={vm.transDelete}>削除</Button>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-between w-[60%]">    
                                <Button className="text-[11px] sm:text-sm w-[45%] bg-blue-900 shadow-none hover:bg-blue-700" onClick={vm.handleUserModal}>{vm.userModalStatus}</Button>
                                <Button className="text-[10px] sm:text-sm w-[45%] bg-blue-900 shadow-none hover:bg-blue-700" onClick={vm.handleLogout}>ログアウト</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </header>
    )
}