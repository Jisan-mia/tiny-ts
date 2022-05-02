import React, { useState } from 'react'
import { Status } from '../types'
import styles from './TodoStatus.module.scss'

interface IProps {
  status: Status,
  todoStatus: string,
  setTodoStatus: React.Dispatch<React.SetStateAction<Status>>
}

const TodoStatus: React.FC<IProps> = ({status, todoStatus, setTodoStatus}) => {
  return (
    <li onClick={() => setTodoStatus(status)} className={`${styles.status} ${todoStatus == status && styles.selectedStatus}`}>
      {status}
    </li>
  )
}

export default TodoStatus