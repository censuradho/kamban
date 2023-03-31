import { FORM_ERROR_MESSAGES } from '@/constants/messages'
import * as y from 'yup'

export const columnFormSchemaValidation = y.object({
  name: y.string().required(FORM_ERROR_MESSAGES.required)
})