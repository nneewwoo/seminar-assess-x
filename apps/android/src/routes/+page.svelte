<script lang="ts">
  import { LocalKeys } from '$lib/constants'
  import { appContext, sessionContext } from '$lib/state.svelte'
  import {
    getApi,
    navigateTo,
    postApi,
    useLocalStorage,
    validate
  } from '$lib/utils'
  import { invoke } from '@tauri-apps/api/core'
  import { emit } from '@tauri-apps/api/event'
  import { onDestroy, onMount } from 'svelte'

  let unlistenOffline: () => void

  const getCurrentCycle = async (): Promise<string | undefined> => {
    const response = await getApi<{ error?: string; cycleId?: string }>(
      fetch,
      `${import.meta.env.VITE_API_URL}/cycles/current`
    )

    if (response.success && response.body) {
      return response.body.cycleId
    }
  }

  const getCurrentCyclePeriod = async (
    cycleId: string
  ): Promise<string | undefined> => {
    const response = await postApi<{ error?: string; period?: string }>(
      fetch,
      `${import.meta.env.VITE_API_URL}/periods/current`,
      { cycleId }
    )

    if (response.success && response.body) {
      return response.body.period
    }
  }

  const init = async () => {
    if (typeof window !== 'undefined') {
      if (window.navigator.onLine) {
        sessionContext.token =
          useLocalStorage('get', LocalKeys.SESSION_TOKEN) || ''

        if (!sessionContext.token) {
          navigateTo('/account/signin/steps/email')
          return
        } else {
          const valid = await validate()

          if (valid) {
            sessionContext.cycleId = await getCurrentCycle()
            sessionContext.period = await getCurrentCyclePeriod(
              sessionContext.cycleId ?? ''
            )
          } else {
            invoke('session_invalid_dialog').then(() => {
              sessionContext.token = ''
              navigateTo('/account/signin/steps/email')
              return
            })
          }
        }
      } else {
        emit('has-internet', 'false')
      }
    }
  }

  const postInit = async () => {
    const { period } = sessionContext
    if (period) {
      switch (period) {
        case 'IDLE':
          navigateTo('/main/idle')
          break
        case 'VOTING':
          navigateTo('/main/vote')
          break
        case 'PRE_TEST':
          navigateTo('/main/test/pre')
          break
        case 'POST_TEST':
          navigateTo('/main/test/post')
          break
        case 'EVAL':
          navigateTo('/main/test/evaluation')
          break
        default:
          break
      }
      return
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      unlistenOffline = () => emit('has-internet', false)
      window.addEventListener('offline', unlistenOffline)
    }
  })

  onDestroy(() => {
    window.removeEventListener('offline', unlistenOffline)
  })

  onMount(async () => {
    await init()
    await postInit()
  })
</script>

<div class="flex h-full w-full justify-center items-center">
  <img src="/logo.png" alt="logo" width="40%" height="40%" />
</div>
