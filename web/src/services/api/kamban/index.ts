import { api } from ".."
import { CreateKamban, FindKambanByIdResponse, FindManyKambanResponse, Kamban, UpdateKamban } from "./types"

const findMany = async () => {
  const { data } = await api.get<FindManyKambanResponse>('/kamban')
  return data
}

const findById = async (id: string) => {
  const { data } = await api.get<FindKambanByIdResponse>(`/kamban/${id}`)

  return data
}


const create = async (payload: CreateKamban) => {
  const { data } = await api.post<Kamban>('/kamban', payload)
  return data
}

const update = async (id: string, payload: UpdateKamban) => {
  await api.put(`/kamban/${id}`, payload)
}

const deleteKamban = async (id: string) => {
  await api.delete(`/kamban/${id}`)
}

export const kambanService = {
  findMany,
  findById,
  create,
  update,
  delete: deleteKamban
}