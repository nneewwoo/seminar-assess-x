import type { LocalKeys } from './constants'

export type Optional<T> = T | null

export interface IResponse<T> {
  success: boolean
  body?: T
}

export type Keys = LocalKeys

export type EvaluationCategory = {
  id: string
  type: 'RATING' | 'FEEDBACK'
  title: string
  _count: {
    questions: number
  }
}

export type EvaluationQuestion = {
  id: string
  evalId: string
  question: string
}

export type Seminar = {
  id: string
  title: string
  description: string
  numberOfVotes: number
  course: string
  votedByUser: boolean
}
