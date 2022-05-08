import { useState } from "react";
import { Column, ColumnRecord, Status, Todo } from "../types";
import TodoInput from "./TodoInput";
import TodoColumn from "./TodoColumn";
import styles from './Column.module.scss'

import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../utils/array";
import createUUID from "../utils/helpers";
import TodoItem from "./TodoItem";



function TodoApp() {

  const [columns, setColumns] = useState<ColumnRecord>({
    backlog: {
      name: 'Backlog',
      items: [
        {
          id: createUUID(),
          todo: 'backlog demo',
          status: 'Backlog'
        },
        {
          id: createUUID(),
          todo: 'backlog demo 2',
          status: 'Backlog'
        }
      ]
    },
    todo: {
      name: 'Todo',
      items: [
        {
          id: createUUID(),
          todo: 'todo demo',
          status: 'Todo',
          
        },
        {
          id: createUUID(),
          todo: 'todo demo 2',
          status: 'todo'
        }
      ]
    },
    inProgress: {
      name: "In Progress",
      items: [
        {
          id: createUUID(),
          todo: 'in progress demo',
          status: 'In Progress'
        }
      ]
    },
    done: {
      name: "Done",
      items: [
        {
          id: createUUID(),
          todo: 'done demo',
          status: 'Done'
        }
      ]
    }
  })
  
  const [todo, setTodo] = useState<string>("");
  const [todoStatus, setTodoStatus] = useState<Status>("Backlog")



  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todo) {

      const columnId = todoStatus == "In Progress" ? 'inProgress' : todoStatus.toLowerCase();

      setColumns({
        ...columns,
        [columnId] : {
          ...columns[columnId],
          items: [
            ...columns[columnId].items,
            {
              id: createUUID(),
              todo: todo,
              status: todoStatus
            }
          ]
        }
      })

      setTodo("")
      setTodoStatus("Backlog")
    }
  }



  // dnd-kit
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({active} :any ) => {
    // console.log(active.id)
    setActiveId(active.id)
  };

  const handleDragCancel = () => setActiveId(null);


  
  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    console.log({active, over})


    if(!overId) return;


    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;


    if(activeContainer !== overContainer) {
      setColumns((columns) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in columns
            ? columns[overContainer].items.length + 1
            : over.data.current?.sortable.index;

        return moveBetweenContainers(
          columns,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  }
  
  const handleDragEnd = ({ active, over }: DragOverEvent) => {
    if (!over) {
      setActiveId(null);
      return;
    }
    console.log({active, over})


    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in columns
          ? columns[overContainer].items.length + 1
          : over.data.current?.sortable.index;

      setColumns((columns) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...columns,
            [overContainer]: {
              ...columns[overContainer],
              items: [
                ...arrayMove(
                  columns[overContainer].items,
                  activeIndex,
                  overIndex
                )
              ]
            },
          };
        } else {
          newItems = moveBetweenContainers(
            columns,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };


  const moveBetweenContainers = (
    columns: ColumnRecord,
    activeContainer: any,
    activeIndex: any,
    overContainer: any,
    overIndex: any,
    item: any
  ) => {
    return {
      ...columns,
      [activeContainer]: {
        ...columns[activeContainer],
        items: [
          // ...columns[activeContainer].items,
          ...removeAtIndex(columns[activeContainer].items, activeIndex)
        ]
      },
      [overContainer]: {
        ...columns[overContainer],
        items: [
          // ...columns[overContainer].items,
          ...insertAtIndex(columns[overContainer].items, overIndex, item)
        ]
      },
    };
  };

  const getActiveColumnItem = (id: string) => {
    const items = Object.keys(columns).map(columnId => columns[columnId]).map(column => column.items).flat()
    const activeItem = items.filter(i => i.id === id)[0]
    return activeItem
  }

  const getActiveColumnId = (status: string) => {
    return status == 'In Progress' ? 'inProgress' : status.toLowerCase();
  }
  
    
  return (
    <>
      <TodoInput 
        todo={todo} 
        setTodo={setTodo} 
        todoStatus={todoStatus}
        setTodoStatus={setTodoStatus}
        handleSubmitTodo={handleSubmitTodo}
      />


      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
          
        <div className={styles.todo__container}>
        {
          Object.entries(columns).map(([columnId, column]) => (
            <TodoColumn 
              key={columnId}
              activeId={activeId}
              column={column}
              columnId={columnId}
              columns={columns} 
              setColumns={setColumns} 
            />
          ))
        }

        </div>

        <DragOverlay 
          dropAnimation={{
            duration: 500,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {
            activeId ? 
              <TodoItem 
                id={activeId} 
                todo={getActiveColumnItem(activeId)} 
                columns={columns}
                setColumns={setColumns}
                columnId={getActiveColumnId(getActiveColumnItem(activeId).status)}
              />
              : null
          }
        </DragOverlay>
        
      </DndContext>


    </>

  );
}

export default TodoApp;