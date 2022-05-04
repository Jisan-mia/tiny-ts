import React from 'react'
import { Column, ColumnRecord, Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './Column.module.scss'

interface IProps {
  column: Column,
  columnId: string,
  columns: ColumnRecord,
  setColumns: React.Dispatch<React.SetStateAction<ColumnRecord>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const Todos:React.FC<IProps> = ({column,columnId, columns, setColumns, todos, setTodos}) => {
  return (
    
    <div className={`${styles.todo__content}`}>
      <h2> {column.name} </h2>

      <ul className={styles.todos}>
        {
          column.items.map((todo, idx) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              todos={todos} 
              setTodos={setTodos}
              columns={columns}
              setColumns={setColumns}
              columnId={columnId}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default Todos