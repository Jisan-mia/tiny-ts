export interface Todo {
  id: number,
  todo: string,
  status: string
  dateCreaeted?: Date,
}

export interface ColumnRecord {
   [key: string]: Column
}

export interface Column {
  name: "Backlog" 
        | "Todo" 
        | "In Progress"
        | "Done",
  items: Todo[],
}

export type Status = 'Backlog' | 'Todo' | 'In Progress' | 'Done'

// const obj: Column = {
//   name: "Backlog",
//   todos: [
//     {
//       id: 5,
//       todo: 'jisan',
//       isDone: true
//     }
//   ]
// }