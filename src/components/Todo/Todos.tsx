import React from 'react'
import styles from './Todos.module.scss'

const Todos:React.FC = () => {
  return (
    <div className={styles.todo__container}>
      <div className={styles.active__todo}>
        <h2>Active</h2>

        <ul className={styles.todos}>
          <li className={styles.todo__item}>todo item</li>
          <li className={styles.todo__item}>todo item</li>

          <li className={styles.todo__item}>todo item</li>

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