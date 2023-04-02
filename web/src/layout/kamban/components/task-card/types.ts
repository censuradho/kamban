import { Task } from "@/services/api/kamban/types";

export interface TaskCardProps {
  data: Task
  columnId: string
  onDelete?: () => void
  onEdit?: () => void
}