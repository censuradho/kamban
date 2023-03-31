import axios from 'axios'

import { appSettings } from '@/config/app'

export const api = axios.create({
  baseURL: appSettings.backend_url
})