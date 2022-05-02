import React from 'react'
import { Column, ColumnRecord, Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './Todos.module.scss'

interface IProps {
  columns: ColumnRecord,
  setColumns: React.Dispatch<React.SetStateAction<ColumnRecord>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const Todos:React.FC<IProps> = ({columns, setColumns, todos, setTodos}) => {
  return (
    
    <div className={styles.todo__container}>
     
      {
        Object.entries(columns).map(([columnId, column], idx) => {
          return (
            <div className={`${styles.todo__content}`} key={idx}>
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
        })
      }

    </div>
  )
}

export default Todos