import React from 'react'
import styles from './TodoInput.module.scss'

const TodoInput = () => {
  return (
    <form className={styles.container}>
      <div className={styles.card}>
      <h2>
        Todo
        </h2>

        <label htmlFor="todo" className={styles.input}>
          <input type="text" className={styles.input__field} />
          <span className={styles.input__label}>
            Start typing here
          </span>
        </label>

        <div className={styles.button__group}>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </div>
    </form>
  )
}

export default TodoInput