export interface Cycle {
  id: string
  month: Date
  year: Date
  active: boolean
}

export interface CyclePeriod {
  id: string
  current_period: string
  cycle_id: string
  started_at: Date
  ended_at: Date
}
