import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './Todos.module.scss'

interface IProps {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Todos:React.FC<IProps> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    
    <div className={styles.todo__container}>

      <Droppable droppableId={`activeTodo`} >
        {
          (provided, snapshot) => (
            <div className={`${styles.active__todo} ${snapshot.isDraggingOver && styles.droppingActive}`}  ref={provided.innerRef} {...provided.droppableProps}>
              <h2>Active</h2>

              <ul className={styles.todos}>

                {
                  todos.length ? todos.map((todo, idx) => (
                    <TodoItem index={idx} key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
                  )) : ''
                }

                {provided.placeholder}

              </ul>
            </div>
          )
        }

      </Droppable>

      <Droppable droppableId={`completedTodo`} >
        {
          (provided, snapshot) => (
            <div className={`${styles.completed__todo} ${snapshot.isDraggingOver && styles.droppingCompleted}`} ref={provided.innerRef} {...provided.droppableProps}>
              <h2>Completed</h2>

              <ul className={styles.todos}>

                {
                  completedTodos.length ? completedTodos.map((todo, idx) => (
                    <TodoItem index={idx} key={todo.id} todo={todo} todos={completedTodos} setTodos={setCompletedTodos}/>
                  )) : ''
                }
                {provided.placeholder}

              </ul>
            </div>
          )
        }

      </Droppable>

    </div>
  )
}

export default Todos