import { Task } from "@/context/board/types"
import { Column, CreateTask } from "@/services/api/kamban/types"

export interface TaskFormProps   {
  columnId?: string
  taskToEdit?: Task | null
  columns?: Column[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSubmit?: () => void
}

export interface TaskFormData extends CreateTask {}