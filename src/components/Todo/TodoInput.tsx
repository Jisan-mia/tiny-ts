import React, { useEffect, useRef, useState } from 'react'
import { Status } from '../types';
import styles from './TodoInput.module.scss'
import TodoStatus from './TodoStatus';

interface IProps {
  todo: string,
  todoStatus: Status,
  setTodoStatus:React.Dispatch<React.SetStateAction<Status>>,
  setTodo: React.Dispatch<React.SetStateAction<string>>,
  handleSubmitTodo: (e: React.FormEvent<HTMLFormElement>) => void
}

const allStatus: Status[] = ['Backlog', 'Todo', 'In Progress', 'Done']

const TodoInput:React.FC<IProps> = ({todo, setTodo, handleSubmitTodo, todoStatus, setTodoStatus}) => {

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
      onSubmit={(e) => {
        handleSubmitTodo(e)
        inputRef.current?.blur();
      }} 
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
        
        <div className={styles.status__container}>
          <h3>Status</h3>
          <ul className={styles.all__status}>
            {allStatus.map(s => (
              <TodoStatus key={s} status={s} todoStatus={todoStatus} setTodoStatus={setTodoStatus}/>
            ))}
          </ul>
        </div>



        <div className={styles.button__group}>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </div>
    </form>
  )
}

export default TodoInput