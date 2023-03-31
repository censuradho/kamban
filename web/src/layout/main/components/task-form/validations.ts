import { FORM_ERROR_MESSAGES } from '@/constants/messages'
import * as y from 'yup'

export const taskFormSchemaValidation = y.object({
  description: y.string(),
  name: y.string().required(FORM_ERROR_MESSAGES.required)
})