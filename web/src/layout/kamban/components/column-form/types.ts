import { Column } from "@/context/board/types"

export interface ColumnFormProps {
  data?: Column | null
  kambanId: string
  onSubmit?: () => Promise<void> | void
  loading?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface ColumnFormData {
  name: string
}