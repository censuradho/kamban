import { api } from ".."
import { Column, CreateColumnPayload, MovePayload, UpdateColumnPayload } from "./types"

const create = async (kambanId: string, payload: CreateColumnPayload) => {
  const { data } = await api.post<Column>(`/kamban/${kambanId}/column`, payload)

  return data
} 

const update = async (id: string, payload: UpdateColumnPayload) => {
  const { data } = await api.put<Column>(`/kamban/column/${id}`, payload)

  return data
}

const deleteColumn = async (id: string) => {
  await api.delete(`/kamban/column/${id}`)
}

const move = async (payload: MovePayload) => {
  const {
    columnId,
    kambanId,
    position
  } = payload

  await api.patch(`/kamban/${kambanId}/column/${columnId}/move/${position}`)
}


export const moveTask = async (fromColumnId: string, taskId: string, toColumnId: string) => {
  await api.patch(`/kamban/column/${fromColumnId}/task/${taskId}/move/${toColumnId}`)
}

export const columnService = {
  create,
  update,
  delete: deleteColumn,
  move,
  moveTask
}