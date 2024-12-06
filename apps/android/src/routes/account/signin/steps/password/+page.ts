import { SESSION_TOKEN } from '$lib/store'
import { get } from 'svelte/store'
import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageLoad = async () => {
  if (get(SESSION_TOKEN)) {
    redirect(301, '/')
  }
}
