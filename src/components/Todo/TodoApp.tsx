import { useState } from "react";
import { Column, ColumnRecord, Todo } from "../types";
import TodoInput from "./TodoInput";
import Todos from "./Todos";


function TodoApp() {

  const [columns, setColumns] = useState<ColumnRecord>({
    backlog: {
      name: 'Backlog',
      items: [
        {
          id: 54545484,
          todo: 'backlog demo'
        }
      ]
    },
    todo: {
      name: 'Todo',
      items: [
        {
          id: 3898748,
          todo: 'todo demo'
        }
      ]
    },
    inProgress: {
      name: "In Progress",
      items: [
        {
          id: 215754,
          todo: 'in progress demo'
        }
      ]
    },
    done: {
      name: "Done",
      items: [
        {
          id: 98359234,
          todo: 'done demo'
        }
      ]
    }
  })
  
  const [todo, setTodo] = useState<string>("");
  const [backlogTodos, setBacklogTodos] = useState<Todo[]>([])
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])



  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todo) {
      setTodos([...todos, {
        id: Date.now(),
        todo: todo,
      }])

      setTodo("")
    }
  }

  
    
  return (
    <>
        {/* <TodoInput todo={todo} setTodo={setTodo} handleSubmitTodo={handleSubmitTodo}/> */}
        <Todos columns={columns} setColumns={setColumns} todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
    </>

  );
}

export default TodoApp;