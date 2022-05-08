import React, { useEffect, useRef, useState } from 'react'
import { Column, ColumnRecord, Todo } from '../types'
import styles from './TodoItem.module.scss'

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type IProps = {
  id: string,
  todo: Todo,
  columns: ColumnRecord,
  setColumns: React.Dispatch<React.SetStateAction<ColumnRecord>>,
  columnId: string,
}

const TodoItem:React.FC<IProps> = ({ id, todo, columns, setColumns, columnId}) => {
  console.log(columns[columnId])
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo?.todo)
  const todoRef = useRef<HTMLTextAreaElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };


  // console.log(todo, index)
  useEffect(() => {
    todoRef.current?.setSelectionRange(editTodo.length, editTodo.length)
    todoRef.current?.focus();
  }, [editModeState])

  
  const handleEditTodos = (id: string, columnId: string) => {
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
  const onKeyDn = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: string, status: string) => {
    if (editModeState && e.keyCode === 13) { // ESC;
      setEditModeState(false)

      handleEditTodos(id, status)
    }    
  }

  const auto_height = (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }
  

  return (
    <li 
      className={`${styles.todo__item}`} 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
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
            onBlur={() => handleEditTodos(todo.id, todo.status)}
            onKeyDown={e => onKeyDn(e, todo.id, todo.status)}
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