<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/button/text-button'

  import { page } from '$app/stores'
  import { api } from '$lib/axios-instance'
  import { z } from 'zod'
  import { navigateTo } from '$lib/utils'
  import { goto } from '$app/navigation'

  type Response = { error: z.ZodIssue[] | string; name?: string }

  let emailError = $state('')

  const handleSubmit = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get('email') as string
    emailError = ''

    try {
      const res = await api.post<Response>('/account/signin/steps/email', {
        email
      })

      if (res.success) {
        navigateTo('/account/signin/steps/password', {
          params: { email, name: res.body?.name || '' }
        })
      }

      if (res.body) {
        if (Array.isArray(res.body?.error)) {
          res.body?.error.forEach((issue) => {
            switch (issue.path[0]) {
              case 'email':
                emailError = issue.message
                break
            }
          })
        } else {
          emailError = res.body.error
        }
      }
    } catch (error) {
      console.error('API call failed:', error)
    }
  }
</script>

<div class="flex-1 flex flex-col">
  <div class="mb-8">
    <h1>Sign in</h1>
    <span class="text-xl">Enter your email address</span>
  </div>
  <form class="gap-y-4 flex flex-col" onsubmit={handleSubmit}>
    <div>
      <md-outlined-text-field
        label="Email address"
        name="email"
        class="w-full"
        autocomplete="email"
        type="email"
        error={emailError}
        error-text={emailError}
      ></md-outlined-text-field>
    </div>
    <div class="w-full flex justify-between">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <md-text-button
        onclick={() => goto('/account/signup/steps/name')}
        class="-ml-3"
        type="button">Register</md-text-button
      >
      <md-filled-button type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
