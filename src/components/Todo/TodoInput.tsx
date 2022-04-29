import React from 'react'
import styles from './TodoInput.module.scss'

interface IProps {
  todo: string,
  setTodo: React.Dispatch<React.SetStateAction<string>>
}

const TodoInput = ({todo, setTodo}: IProps) => {
  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  
  return (
    <form className={styles.container} onSubmit={(e) => handleSubmitTodo(e)}>
      <div className={styles.card}>
      <h2>
        Todo
        </h2>
    
        <label htmlFor="todo" className={styles.input}>
          <input type="text" className={styles.input__field} placeholder=" " />
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