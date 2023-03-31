import { TextareaHTMLAttributes } from "react";

type RootTextareaProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
  | 'id'
  | 'name'
  | 'onFocus'
  | 'onBlur'
  | 'placeholder'
  | 'inputMode'
>

export interface TextareaProps extends RootTextareaProps {
  label?: string
  errorMessage?: string
}