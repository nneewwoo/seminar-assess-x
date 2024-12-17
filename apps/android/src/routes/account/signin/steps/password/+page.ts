import { sessionContext } from '$lib/state.svelte'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  if (sessionContext.token) {
    redirect(301, '/')
  }
}
