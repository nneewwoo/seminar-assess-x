import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { sessionContext } from '$lib/state.svelte'

export const load: PageLoad = async () => {
  if (sessionContext.period !== 'VOTING' && sessionContext.period !== 'IDLE') {
    // redirect(302, '/main/vote/done')
  }
}
