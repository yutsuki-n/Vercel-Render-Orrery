import { useState } from "react"
import { CreateModal } from "./component/modal";
import { Search } from "./component/search";
import { TodoList } from "./component/todoList";
import type { Todo } from "@/domain/entity/todo";

export const Home = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [reroadToggle, reroad] = useState<boolean>(true);

    return(
        <>
            <CreateModal reroad={reroad}/>
            <Search reroad={reroad} reroadToggle={reroadToggle} setTodos={setTodos}/>
            <TodoList todos={todos} reroad={reroad} />
        </>
    )
}