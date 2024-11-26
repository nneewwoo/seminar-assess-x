import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { useLocalStorage } from './utils'

interface IResponse<T> {
  success: boolean
  body?: T
}

class AInstance {
  protected api: AxiosInstance

  constructor() {
    this.api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

    this.api.interceptors.request.use(
      (config) => {
        const token = useLocalStorage('get', 'session-token')
        if (token) {
          config.headers['Content-Type'] = 'application/json'
          config.withCredentials = true
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  get = async <T>(url: string): Promise<IResponse<T>> => {
    const response: AxiosResponse<IResponse<T>> =
      await this.api.get<IResponse<T>>(url)
    return response.data
  }

  post = async <T>(url: string, data: any): Promise<IResponse<T>> => {
    const response: AxiosResponse<IResponse<T>> = await this.api.post<
      IResponse<T>
    >(url, data)
    return response.data
  }

  delete = async <T>(url: string): Promise<IResponse<T>> => {
    const response: AxiosResponse<IResponse<T>> =
      await this.api.delete<IResponse<T>>(url)
    return response.data
  }
}

export const api = new AInstance()
