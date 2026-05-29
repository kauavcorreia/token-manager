import axios from 'axios'
import { ApiResponse } from '@/types/api.types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  get: <T = any>(url: string) => api.get<ApiResponse<T>>(url),
  post: <T = any>(url: string, data?: any) => api.post<ApiResponse<T>>(url, data),
  put: <T = any>(url: string, data?: any) => api.put<ApiResponse<T>>(url, data),
  delete: <T = any>(url: string) => api.delete<ApiResponse<T>>(url),
}
