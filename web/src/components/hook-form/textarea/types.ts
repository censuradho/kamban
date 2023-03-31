import { UseFormRegisterReturn  } from "react-hook-form/dist/types";
import { TextareaProps } from '@/components/textarea/types'

export interface TextareaFormProps extends TextareaProps {
  register: UseFormRegisterReturn
}