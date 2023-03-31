import { Task } from "@/context/board/types";

export interface CurrentTask extends Task {
  columnId: string
}