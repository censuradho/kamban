import { FORM_ERROR_MESSAGES } from '@/constants/messages'
import * as y from 'yup'

export const newBoardSchemaValidation = y.object({
  name: y.string().required(FORM_ERROR_MESSAGES.required),
  columns: y.array().of(
    y.object({
      name: y.string().required(FORM_ERROR_MESSAGES.required)
    })
  )
})