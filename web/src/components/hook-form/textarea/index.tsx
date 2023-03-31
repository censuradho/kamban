import { Textarea } from "@/components"
import { TextareaFormProps } from "./types"

export function TextareaForm (props: TextareaFormProps) {
  const { register, ...otherProps } = props

  return (
    <Textarea 
      {...register}
      {...otherProps}
    />
  )
}