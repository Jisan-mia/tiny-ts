import React from 'react'
import { Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './Todos.module.scss'

interface IProps {
  todos: Todo[]
}

const Todos:React.FC<IProps> = ({todos}) => {
  return (
    <div className={styles.todo__container}>
      <div className={styles.active__todo}>
        <h2>Active</h2>

        <ul className={styles.todos}>
          {
            todos && todos.map((todo) => (
             <TodoItem key={todo.id} todo={todo} />
            ))
          }

        </ul>
      </div>

      <div className={styles.completed__todo}>
        <h2>Completed</h2>
        <ul className={styles.todos}>
          <li className={styles.todo__item}>todo item</li>
        </ul>
      </div>
    </div>
  )
}

export default Todos