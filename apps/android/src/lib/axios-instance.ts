import axios from 'axios'
import { useLocalStorage } from './utils'

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL })

instance.interceptors.request.use(
  (config) => {
    const token = useLocalStorage('get', 'jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { instance as api }
