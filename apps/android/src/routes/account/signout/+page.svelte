<script lang="ts">
  import { SESSION_TOKEN } from '$lib/store'
  import { navigateTo, useLocalStorage } from '$lib/utils'
  import { getApi } from '$lib/utils/fetch'
  import '@material/web/progress/circular-progress'

  type Response = { success: boolean; body?: { error: string } }

  const logout = async () => {
    try {
      const data = await getApi<Response>(
        fetch,
        `${import.meta.env.VITE_API_URL}/account/signout`
      )

      if (data.success) {
        useLocalStorage('remove', 'session-token')
        SESSION_TOKEN.set(undefined)
        navigateTo('/account/signin/steps/email', undefined, {
          replaceState: true
        })
      }
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  $effect(() => {
    logout()
  })
</script>

<div class="fixed top-[calc(50%_-_20px)] left-[calc(50%_-_20px)]">
  <md-circular-progress indeterminate></md-circular-progress>
</div>

<style module>
  md-circular-progress {
    --md-circular-progress-size: 40px;
  }
</style>
