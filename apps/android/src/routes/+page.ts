import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { CURRENT_PERIOD, SESSION_TOKEN } from '$lib/store'
import { get } from 'svelte/store'
import { getApi } from '$lib/utils/fetch'

export const load: PageLoad = async ({ fetch }) => {
  if (!get(SESSION_TOKEN)) {
    redirect(302, '/account/signin/steps/email')
  }

  const period = await getApi<{ error?: string; period: string }>(
    fetch,
    `${import.meta.env.VITE_API_URL}/periods/current`
  )

  // TODO: Handle error delete expired token
  if (period.success) {
    const current = period.body?.period as string
    CURRENT_PERIOD.set(current)

    switch (current) {
      case 'IDLE':
        redirect(302, '/main/idle')
      case 'VOTING':
        redirect(302, '/main/vote')
      case 'PRE_TEST':
        redirect(302, '/main/test/pre')
      case 'POST_TEST':
        redirect(302, '/main/test/post')
      case 'EVAL':
        redirect(302, '/main/test/evaluation')
      default:
        break
    }
  }
}
