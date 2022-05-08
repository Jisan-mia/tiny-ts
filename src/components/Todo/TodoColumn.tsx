import React from 'react'
import { Column, ColumnRecord, Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './Column.module.scss'

import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";


interface IProps {
  activeId?: any,
  column: Column,
  columnId: string,
  columns: ColumnRecord,
  setColumns: React.Dispatch<React.SetStateAction<ColumnRecord>>,
}

const Todos:React.FC<IProps> = ({activeId, column,columnId, columns, setColumns}) => {

  const { setNodeRef } = useDroppable({
    id: columnId
  });


  return (
    
    <div className={`${styles.todo__content}`}>
      <h2> {column.name} </h2>


      <SortableContext
        id={columnId}
        items={[...column.items.map(i => `${i.id}`)]}
        strategy={rectSortingStrategy}
      >
      <ul className={styles.todos} ref={setNodeRef}>
        {
          column.items.map((todo, idx) => (
            <TodoItem 
              handle={true}
              id={todo.id}
              key={todo.id} 
              todo={todo} 
              columns={columns}
              setColumns={setColumns}
              columnId={columnId}
            />
          ))
        }
      </ul>

      </SortableContext>
    </div>
  )
}

export default Todos