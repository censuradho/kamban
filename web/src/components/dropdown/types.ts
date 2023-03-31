import { ReactNode } from "react"

interface Option {
  label: string | ReactNode
  onClick?: () => void,
}

export interface DropdownProps {
  options: Option[]
}