import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../types'
import styles from './TodoItem.module.scss'

type IProps = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem:React.FC<IProps> = ({todo, todos, setTodos}) => {
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo?.todo)
  const todoRef = useRef<HTMLInputElement>(null)

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
  const onKeyDn = (e: React.KeyboardEvent<HTMLDivElement>, id: number) => {
    if (editModeState && e.keyCode === 13) { // ESC;
      setEditModeState(false)

      handleEditTodos(id)
    }    
  }

  return (
    <>
      <li className={styles.todo__item} >
        
        {
          !editModeState ? (
            <div
              onClick={() =>setEditModeState(true)}
              className={styles.todo__text}
              >
              {todo.todo}
            </div>
          ) : (
            <input 
              ref={todoRef}
              value={editTodo} 
              onChange={e => setEditTodo(e.target.value)} 
              onBlur={() => handleEditTodos(todo.id)}
              onKeyDown={e => onKeyDn(e, todo.id)}
              type="text" 
              className={styles.todo__text}

            />
          )
        }
        
        

        <div className={styles.actions}>
          {/* <input type="checkbox" checked={todo.isDone} name="" id="" /> */}
        </div>
      
      </li>
    </>
  )
}

export default TodoItem