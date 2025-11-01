import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUpVM } from "@/viewModel/signUpVM";

export const SignUp = () => {
    const vm = useSignUpVM();
    return (
        <>
            <div className="w-[60%] mx-auto my-5">
                <h1 className="text-[30px] font-medium text-blue-900">サインアップ</h1>
                
                {vm.error && (
                    <p className="pt-4 text-red-500">{vm.error}</p>
                )}

                {vm.wait && (
                    <p className="pt-4">{vm.wait}</p>
                )}

                <div>
                    <form onSubmit={vm.handleSubmit} className="pt-10">
                        <div>
                            <p className="text-xs">メールアドレス</p>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
                                              type="text" value={vm.email} onChange = {(e) => vm.setEmail(e.target.value)} />
                        </div>
                        <div className="pt-10">
                            <p className="text-xs">パスワード</p>
                            <Input className="border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent"  type="text" value={vm.viewPassword} onChange = {(e) => vm.handlePassword(e.target.value)} />
                        </div>
                        
                        <Button className="mt-10 w-3/4 md:w-2/3 lg:w-4/7 mx-auto block bg-blue-800
                                          hover:bg-blue-700" 
                                          type="submit">Sign up</Button>
                    </form>
                </div>
                <div className="h-8 mt-7 flex items-cneter justify-center my-6 ">
                    <div className="flex-1 h-[5%] bg-blue-900 my-auto"></div>
                    <span className="mx-4 text-blue-900 my-auto">または</span>
                    <div className="flex-1 h-[5%] bg-blue-900 my-auto"></div>
                </div>
                <Button className="mt-7 w-3/4 md:w-2/3 lg:w-4/7 mx-auto block bg-blue-400
                                   hover:bg-blue-500" 
                                  onClick={() => vm.navigate("/")}>Log in</Button>
            </div>
        </>
    )
}