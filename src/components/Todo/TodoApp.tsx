import { useState } from "react";
import { Column, ColumnRecord, Status, Todo } from "../types";
import TodoInput from "./TodoInput";
import Todos from "./Todos";


function TodoApp() {

  const [columns, setColumns] = useState<ColumnRecord>({
    backlog: {
      name: 'Backlog',
      items: [
        {
          id: 54545484,
          todo: 'backlog demo',
          status: 'Backlog'
        }
      ]
    },
    todo: {
      name: 'Todo',
      items: [
        {
          id: 3898748,
          todo: 'todo demo',
          status: 'Todo'
        }
      ]
    },
    inProgress: {
      name: "In Progress",
      items: [
        {
          id: 215754,
          todo: 'in progress demo',
          status: 'In Progress'
        }
      ]
    },
    done: {
      name: "Done",
      items: [
        {
          id: 98359234,
          todo: 'done demo',
          status: 'Done'
        }
      ]
    }
  })
  
  const [todo, setTodo] = useState<string>("");
  const [todoStatus, setTodoStatus] = useState<Status>("Backlog")
  const [backlogTodos, setBacklogTodos] = useState<Todo[]>([])
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inProgressTodos, setInProgressTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])



  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todo) {

      const columnId = todoStatus == "In Progress" ? 'inProgress' : todoStatus.toLowerCase();

      setColumns({
        ...columns,
        [columnId] : {
          ...columns[columnId],
          items: [
            ...columns[columnId].items,
            {
              id: Date.now(),
              todo: todo,
              status: todoStatus
            }
          ]
        }
      })

      // setTodos([...todos, {
      //   id: Date.now(),
      //   todo: todo,
      //   status: todoStatus
      // }])

      setTodo("")
      setTodoStatus("Backlog")
    }
  }

  
    
  return (
    <>
      <TodoInput 
        todo={todo} 
        setTodo={setTodo} 
        todoStatus={todoStatus}
        setTodoStatus={setTodoStatus}
        handleSubmitTodo={handleSubmitTodo}
      />
      <Todos 
        columns={columns} 
        setColumns={setColumns} 
        todos={todos} 
        setTodos={setTodos} 
        completedTodos={completedTodos} 
        setCompletedTodos={setCompletedTodos}
      />
    </>

  );
}

export default TodoApp;