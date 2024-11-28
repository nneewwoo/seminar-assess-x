export type Optional<T> = T | null

export interface IResponse<T> {
  success: boolean
  body?: T
}
