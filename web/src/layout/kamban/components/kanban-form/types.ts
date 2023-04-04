import { CreateColumnPayload } from "@/services/api/kamban/types"

export interface KanbanFormProps {}

export interface KanbanFormData {
  name: string
  columns: CreateColumnPayload[]
}