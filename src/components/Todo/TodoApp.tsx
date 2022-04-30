import { useState } from "react";
import { Column, ColumnRecord, Todo } from "../types";
import TodoInput from "./TodoInput";
import Todos from "./Todos";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


function TodoApp() {

  const [columns, setColumns] = useState<ColumnRecord>({})
  
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

  const handleDragEnd = (result: DropResult) => {
    const {destination, source} = result

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return 


    let add,
      active = todos,
      complete = completedTodos;
    
    if(source.droppableId === 'activeTodo') {
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === 'activeTodo') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setTodos(active)
    setCompletedTodos(complete)
  }
    
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* <TodoInput todo={todo} setTodo={setTodo} handleSubmitTodo={handleSubmitTodo}/> */}
        <Todos columns={columns} setColumns={setColumns} todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </DragDropContext>
    </>

  );
}

export default TodoApp;