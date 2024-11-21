import { writable } from 'svelte/store'
import type { CyclePeriod, Cycle } from './types'

export const TEMP_USER_ID = writable('')

export const CYCLE = writable<Cycle>()

export const CYCLE_PERIOD = writable<CyclePeriod>()
