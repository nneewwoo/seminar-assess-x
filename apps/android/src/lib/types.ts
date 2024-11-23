export type Cycle = {
  id: string
  month: Date
  year: Date
  active: boolean
}

export type CyclePeriod = {
  id: string
  current_period: string
  cycle_id: string
  started_at: Date
  ended_at: Date
}

export type Seminar = {
  id: string
  title: string
  cycle_id: string
  course: string
  number_of_votes: number
}
