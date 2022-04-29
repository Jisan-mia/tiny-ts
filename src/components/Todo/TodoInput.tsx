import React, { useEffect, useRef } from 'react'
import styles from './TodoInput.module.scss'

interface IProps {
  todo: string,
  setTodo: React.Dispatch<React.SetStateAction<string>>,
  handleSubmitTodo: (e: React.FormEvent<HTMLFormElement>) => void
}

const TodoInput:React.FC<IProps> = ({todo, setTodo, handleSubmitTodo}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null)

  const handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formRef.current?.reset();
    setTodo("")
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [])
  
  return (
    <form 
      ref={formRef}
      className={styles.container} 
      onSubmit={(e) => handleSubmitTodo(e)} 
      onReset={(e) => handleResetForm(e)}
    >
      <div className={styles.card}>
      <h2>
        Todo
        </h2>
    
        <label htmlFor="todo" className={styles.input}>
          <input 
            type="text" 
            className={styles.input__field} 
            placeholder=" " 
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            ref={inputRef}
            />
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