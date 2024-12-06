import { get } from 'svelte/store'
import type { PageLoad } from './$types'
import { CURRENT_PERIOD } from '$lib/store'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async () => {
  if (get(CURRENT_PERIOD) !== 'VOTING') {
    redirect(302, '/main/vote/done')
  }
}
