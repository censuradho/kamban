import { CreateTaskPayload } from "@/context/board/types";

export interface TaskFormData extends CreateTaskPayload {
  columnId: string
}