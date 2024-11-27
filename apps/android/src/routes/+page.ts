import { useLocalStorage } from '$lib/utils'
import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  const token = useLocalStorage('get', 'session-token')
  if (!token) {
    redirect(302, '/account/signin/steps/email')
  }
}
