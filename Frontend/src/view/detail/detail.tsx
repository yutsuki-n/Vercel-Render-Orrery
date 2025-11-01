import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDetailVM } from "@/viewModel/detailVM";

export const Detail = () => {
  const vm = useDetailVM();

  if (!vm.id) return <p>不正なアクセスです</p>
  if (!vm.todo) return <p>読み込み中...</p>

  return(
    <div className="w-[90%] mx-auto">
      <div className="flex justify-between">
        <h2 className="text-[25px] text-blue-800" >Details</h2>
        <div className="text-right w-[80%] mx-auto text-blue-900">
          <p>作成日：{new Date(vm.todo.created_at).toISOString().split("T")[0] }</p>
          <p>最終更新日：{new Date(vm.todo.updated_at).toISOString().split("T")[0] }</p>
        </div>
      </div>
      <div className="flex justify-between w-[90%] mx-auto mt-8 items-center">
        <div>
          {vm.error && (
              <p className=" text-red-500">{vm.error}</p>
          )}
          {vm.tError && (
              <p className=" text-red-500">{vm.tError}</p>
          )}
          {vm.bError && (
              <p className=" text-red-500">{vm.bError}</p>
          )}
          {vm.dError && (
              <p className=" text-red-500">{vm.dError}</p>
          )}
          {vm.cError && (
              <p className=" text-red-500">{vm.cError}</p>
          )}
        </div>
        <Button className="w-[35%] ml-auto bg-blue-950 hover:bg-blue-900" onClick={() => vm.navigate("/home")}>変更せず戻る</Button>
      </div>
      <form className="mt-3" onSubmit={vm.updateSubmit}>
        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">title</h1>
        <Input className="mb-5 border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
               value={vm.title} onChange={(e) => vm.inputTitle(e.target.value)}/>

        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">about</h1>
        <Textarea className="mb-5 resize-none h-30 border-0 border-l-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
                  value={vm.body ?? undefined} onChange={(e) => vm.inputBody(e.target.value)}/>

        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">Due date</h1>
        <Input className="mb-5 border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
              type="date" value={vm.dueDate ? vm.dueDate?.toISOString().split("T")[0] : "" } 
              onChange={(e) => vm.inputDueDate(e.target.value ? new Date(e.target.value) : undefined )}></Input>

        <h1 className="text-[18px] pt-5 mb-2 pl-1 font-bold text-blue-800">Completed at</h1>
        <Input className="mb-5 border-0 border-b-2 border-gray-400 
                                              focus:border-blue-700 rounded-none 
                                              shadow-none focus:outline-none focus-visible:ring-0
                                              focus-visible:ring-offset-0 bg-transparent focus:bg-transparent" 
              type="date" value={vm.completedAt ? vm.completedAt?.toISOString().split("T")[0] : "" } 
              onChange={(e) => vm.inputCompletedAt(e.target.value ? new Date(e.target.value) : undefined)}></Input>
        <Button className="mt-15 w-[60%] mx-auto block bg-blue-950 hover:bg-blue-900" type="submit" >変更して戻る</Button>
      </form>
    </div>
  )
}