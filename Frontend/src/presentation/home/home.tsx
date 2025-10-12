import { useState } from "react"
import type { ResTodoDTO } from "../../domain/dto/todoDTO";
import { CreateModal } from "./component/createTodo";
import { Search } from "./component/search";
import { TodoList } from "./component/todoList";

export const Home = () => {

    const [todos, setTodos] = useState<ResTodoDTO[]>([]);
    const [reroadToggle, reroad] = useState<boolean>(true);

    return(
        <>
            <CreateModal reroad={reroad}/>
            <Search reroad={reroad} reroadToggle={reroadToggle} setTodos={setTodos}/>
            <TodoList todos={todos} reroad={reroad} />
        </>
    )
}