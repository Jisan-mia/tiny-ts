import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Column, ColumnRecord, Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './Todos.module.scss'

interface IProps {
  columns: ColumnRecord,
  setColumns: React.Dispatch<React.SetStateAction<ColumnRecord>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Todos:React.FC<IProps> = ({columns, setColumns, todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    
    <div className={styles.todo__container}>
     
      {
        Object.entries(columns).map(([columnId, column], idx) => {
          return (
            <Droppable droppableId={`activeTodo`} >
              {
                (provided, snapshot) => (
                  <div 
                    className={`${styles.todo__content} ${snapshot.isDraggingOver && styles.droppingActive}`}  
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                  >
                    <h2> {column.name} </h2>

                    <ul className={styles.todos}>

                      {
                        column.items.length ? column.items.map((todo, idx) => (
                          <TodoItem index={idx} key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
                        )) : ''
                      }

                      {provided.placeholder}

                    </ul>
                  </div>
                )
              }

          </Droppable>
          )
        })
      }

    </div>
  )
}

export default Todos