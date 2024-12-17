import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { appContext } from '$lib/state.svelte'

export const load: PageLoad = () => {
  if (appContext.isAnsweringEvaluation) {
    // redirect(302, appContext.isAnsweringEvaluation)
  }

  return
}
