import React from 'react'
import { Todo } from '../types'
import styles from './TodoItem.module.scss'

type IProps = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem:React.FC<IProps> = ({todo, todos, setTodos}) => {
  return (
    <>
      <li className={styles.todo__item} >
        <div className={styles.todo__text}>{todo.todo}</div>

        <div className={styles.actions}>
          {/* <input type="checkbox" checked={todo.isDone} name="" id="" /> */}
        </div>
      
      </li>
    </>
  )
}

export default TodoItem