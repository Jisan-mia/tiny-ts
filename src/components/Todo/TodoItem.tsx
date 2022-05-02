import React, { useEffect, useRef, useState } from 'react'
import { Column, ColumnRecord, Todo } from '../types'
import styles from './TodoItem.module.scss'

type IProps = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  columns: ColumnRecord,
  setColumns: React.Dispatch<React.SetStateAction<ColumnRecord>>,
  columnId: string,
}

const TodoItem:React.FC<IProps> = ({ todo, todos, setTodos, columns, setColumns, columnId}) => {
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo?.todo)
  const todoRef = useRef<HTMLTextAreaElement>(null)



  // console.log(todo, index)
  useEffect(() => {
    todoRef.current?.setSelectionRange(editTodo.length, editTodo.length)
    todoRef.current?.focus();
  }, [editModeState])

  
  const handleEditTodos = (id: number) => {
    if(editTodo) {
      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          items: columns[columnId].items.map(item => item.id == id ? {...item, todo: editTodo} : item)
        }
      })


      // setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo))

    } else {
      // setTodos(todos.filter(todo => todo.id !== id))
      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          items: columns[columnId].items.filter(item => item.id !== id)
        }
      })
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
    <li 
      className={`${styles.todo__item}`} 
    > 
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

export default TodoItem