import { writable } from 'svelte/store'
import { useLocalStorage } from './utils'
import { LocalKeys } from './constants'

export const SESSION_TOKEN = writable<string | undefined>(
  useLocalStorage('get', LocalKeys.SESSION_TOKEN) || undefined
)

export const CURRENT_PERIOD = writable<string>('IDLE')

export const variant = writable<'large' | 'small'>('large')
