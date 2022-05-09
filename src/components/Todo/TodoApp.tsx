import { useEffect, useState } from "react";
import { Column, ColumnRecord, Status, Todo } from "../types";
import TodoInput from "./TodoInput";
import TodoColumn from "./TodoColumn";
import styles from './Column.module.scss'

import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { insertAtIndex, removeAtIndex } from "../utils/array";
import createUUID from "../utils/helpers";
import TodoItem from "./TodoItem";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy
} from "@dnd-kit/sortable";

export const VOID_ID = "void";


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

  useEffect(() => {
    console.log(columns)
  }, [columns])



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

  
  const findContainer = (id: string) => {
    if (id in columns) {
      return id;
    }
    

    return Object.keys(columns).find((key) => columns[key].items.map(i => i.id).includes(id));
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    

    if (!overId) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setColumns((columns) => {
        const activeItems = columns[activeContainer].items;
        const overItems = columns[overContainer].items;
        const overIndex = overItems.map(i => i.id).indexOf(overId);
        const activeIndex = activeItems.map(i => i.id).indexOf(active.id);

        let newIndex: number;

        if (overId in columns) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowLastItem =
            over &&
            overIndex === overItems.length - 1 &&
            active.rect.current.translated 
            // active.rect.current.translated.offsetTop >
            //   over.rect.offsetTop + over.rect.height;
          

          const modifier = isBelowLastItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        return {
          ...columns,
          [activeContainer]: {
            ...columns[activeContainer],
            items: [
              ...columns[activeContainer].items.filter((item) => item.id !== active.id)
            ]
          },
          [overContainer]: {
            ...columns[overContainer],
            items: insert(
              columns[overContainer].items,
              newIndex,
              columns[activeContainer].items[activeIndex]
            )
          }
          // [overContainer]: [
          //   ...columns[overContainer].slice(0, newIndex),
          //   columns[activeContainer][activeIndex],
          //   ...columns[overContainer].slice(
          //     newIndex,
          //     columns[overContainer].length
          //   )
          // ]
        };
      });
    }
  }



  const handleDragEnd = ({ active, over }: DragOverEvent) => {
    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id || VOID_ID;

    

    const overContainer = findContainer(overId);

    if (activeContainer && overContainer) {
      const activeIndex = columns[activeContainer].items.map(i => i.id).indexOf(active.id);
      const overIndex = columns[overContainer].items.map(i => i.id).indexOf(overId);

      if (activeIndex !== overIndex) {
        setColumns((columns) => ({
          ...columns,
          [overContainer]: {
            ...columns[overContainer],
            items: arrayMove(
              columns[overContainer].items,
              activeIndex,
              overIndex
            )
          }
        }));
      }
    }

    setActiveId(null);
  }


  const moveBetweenContainers = (
    columns: ColumnRecord,
    activeContainer: string,
    activeIndex: number,
    overContainer: string,
    overIndex: number,
    item: string
  ) => {
    return {
      ...columns,
      [activeContainer]: {
        ...columns[activeContainer],
        items: [
          ...removeAtIndex(columns[activeContainer].items, activeIndex)
        ]
      },
      [overContainer]: {
        ...columns[overContainer],
        items: [
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
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
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
            ...defaultDropAnimation,
            dragSourceOpacity: 0.5,
            // duration: 500,
            // easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
          adjustScale={true}
        >
          {
            activeId ? 
              <TodoItem 
                id={activeId} 
                todo={getActiveColumnItem(activeId)} 
                columns={columns}
                setColumns={setColumns}
                // columnId={getActiveColumnId(getActiveColumnItem(activeId).status)}
              />
              : null
          }
        </DragOverlay>
        
      </DndContext>


    </>

  );
}

function insert<T>(arr: T[], index: number, elem: T) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}


export default TodoApp;