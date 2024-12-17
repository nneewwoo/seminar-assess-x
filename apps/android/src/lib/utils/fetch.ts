import useLocalStorage from './localstorage'
import type { IResponse } from '$lib/types'
import { LocalKeys } from '$lib/constants'
import { sessionContext } from '$lib/state.svelte'

type Fetch = (
  input: RequestInfo | URL | globalThis.Request,
  init?: RequestInit
) => Promise<Response>

export const getApi = async <T>(fetch: Fetch, url: string) => {
  const session =
    sessionContext.token || useLocalStorage('get', LocalKeys.SESSION_TOKEN)
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session}`
    }
  })
  const body = await response.json()
  return body as IResponse<T>
}

export const postApi = async <T>(fetch: Fetch, url: string, data: unknown) => {
  const session =
    sessionContext.token || useLocalStorage('get', LocalKeys.SESSION_TOKEN)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`
    },
    body: JSON.stringify(data)
  })
  const body = await response.json()
  return body as IResponse<T>
}
