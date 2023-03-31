import { api } from ".."
import { CreateTask, UpdateTask } from "./types"

const deleteTask = (id: string) => {
  return api.delete(`/kamban/column/task/${id}`)
}

const update = async (id: string, payload: UpdateTask) => {
  await api.put(`/kamban/column/task/${id}`, payload)
}

const create = async (columnId: string, payload: CreateTask) => {
  await api.post(`/kamban/column/${columnId}/task`, payload)
}

export const taskService = {
  delete: deleteTask,
  update,
  create
}