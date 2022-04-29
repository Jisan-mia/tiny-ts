import { useState } from "react";
import { Todo } from "../types";
import TodoInput from "./TodoInput";
import Todos from "./Todos";
import { DragDropContext } from 'react-beautiful-dnd';


function TodoApp() {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])



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
      <DragDropContext onDragEnd={() => {}}>
        <TodoInput todo={todo} setTodo={setTodo} handleSubmitTodo={handleSubmitTodo}/>
        <Todos todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </DragDropContext>
    </>

  );
}

export default TodoApp;