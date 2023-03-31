import { Task } from "@/context/board/types";
import { DialogProps } from "@radix-ui/react-dialog";

export interface TaskInfoDialogProps extends Pick<DialogProps, 'onOpenChange' | 'open'> {
  data: Task
  columnId: string
}