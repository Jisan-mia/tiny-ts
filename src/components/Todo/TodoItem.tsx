import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Todo } from '../types'
import styles from './TodoItem.module.scss'

type IProps = {
  index: number,
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem:React.FC<IProps> = ({index, todo, todos, setTodos}) => {
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo?.todo)
  const todoRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    todoRef.current?.focus()
  }, [editModeState])
  
  
  const handleEditTodos = (id: number) => {
    if(editTodo) {
      setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo))

    } else {
      setTodos(todos.filter(todo => todo.id !== id))
    }

    setEditModeState(false)
  }
  const onKeyDn = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: number) => {
    if (editModeState && e.keyCode === 13) { // ESC;
      setEditModeState(false)

      handleEditTodos(id)
    }    
  }

  const auto_height = (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  return (
    <Draggable draggableId={`${todo.id}`} index={index}>
      {
        (provided, snapshot) => (
          <li className={`${styles.todo__item} ${snapshot.isDragging && styles.dragging}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
        
            {
              !editModeState ? (
                <div
                  onClick={() =>setEditModeState(true)}
                  className={styles.todo__text}
                  >
                  {todo.todo}
                </div>
              ) : (
                <textarea 
                  rows={1}
                  ref={todoRef}
                  value={editTodo} 
                  onChange={e => {
                    setEditTodo(e.target.value)
                    auto_height(e)
                  }} 
                  onBlur={() => handleEditTodos(todo.id)}
                  onKeyDown={e => onKeyDn(e, todo.id)}
                  // type="text" 
                  className={styles.todo__text}

                ></textarea>
              )
            }
            
            

            <div className={styles.actions}>
              {/* <input type="checkbox" checked={todo.isDone} name="" id="" /> */}
            </div>
          
          </li>
        )
      }
    </Draggable>
  )
}

export default TodoItem