export interface Todo {
  id: string
  text: string
  completed: boolean
  createdDate: number | null
  completedDate: number | null
}

export interface TodoDto {
  text: string
  completed: boolean
  createdDate: number | null
  completedDate: number | null
}
