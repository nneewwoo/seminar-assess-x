import type { LocalKeys } from './constants'

export type Optional<T> = T | null

export interface IResponse<T> {
  success: boolean
  body?: T
}

export type Keys = LocalKeys
