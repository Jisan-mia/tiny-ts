import React from 'react'
import { Todo } from '../types'
import styles from './TodoItem.module.scss'

interface IProps {
  todo: Todo
}

const TodoItem:React.FC<IProps> = ({todo}) => {
  return (
    <>
      <li className={styles.todo__item} >{todo.todo}</li>
    </>
  )
}

export default TodoItem