import { Task } from "@/context/board/types";

export interface TaskCardProps {
  data: Task
  onClick?: () => void
}