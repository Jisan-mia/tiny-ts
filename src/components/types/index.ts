export interface Todo {
  id: number,
  todo: string,
  dateCreaeted?: Date,
  badge?: string
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