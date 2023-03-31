export interface Task {
  id: string
  name: string
  description: string
  column_id: string
}

export interface Column {
  id: string
  name: string
  position: number
  tasks?: Task[]
}

export interface Kamban {
  id: string
  name: string
  columns?: Column[]
}

export type FindManyKambanResponse = Pick<Kamban, 'name' | 'id'>[] 
export type FindKambanByIdResponse = Kamban

export type CreateTask = Pick<Task, 'name' | 'description'>
export type UpdateTask = Pick<Task, 'name' | 'description'>

export type CreateKamban = Pick<Kamban, 'name'>

export type CreateColumnPayload = Pick<Column, 'name'>
export type UpdateColumnPayload = Pick<Column, 'name'>

export type UpdateKamban = Pick<Kamban, 'name'>

export interface MovePayload {
  kambanId: string
  columnId: string
  position: number
}