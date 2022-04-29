import { useState } from "react";
import { Todo } from "../types";
import TodoInput from "./TodoInput";
import Todos from "./Todos";

function TodoApp() {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);



  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todo) {
      setTodos([...todos, {
        id: Date.now(),
        todo: todo,
        isDone: false
      }])

      setTodo("")
    }
  }
  
  return (
    <>
      <TodoInput todo={todo} setTodo={setTodo} handleSubmitTodo={handleSubmitTodo}/>
      <Todos todos={todos} setTodos={setTodos}/>
    </>
  );
}

export default TodoApp;