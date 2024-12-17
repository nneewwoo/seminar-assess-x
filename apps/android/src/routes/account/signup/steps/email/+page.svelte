<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import { page } from '$app/stores'
  import { z } from 'zod'
  import { navigateTo, postApi, useLocalStorage } from '$lib/utils'
  import { type IResponse } from '$lib/types'
  import LoadingBar from '$lib/components/LoadingBar.svelte'

  let loading = $state(false)

  type ErrorResponse = { error: z.ZodIssue[] | string }

  let emailError = $state('')

  const givenName = $page.url.searchParams.get('givenName') as string
  const familyName = $page.url.searchParams.get('familyName') as string

  const handleSubmit = async (event: SubmitEvent) => {
    loading = true
    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get('email') as string
    emailError = ''

    try {
      const data = await postApi<ErrorResponse>(
        fetch,
        `${import.meta.env.VITE_API_URL}/account/signup/steps/email`,
        {
          email,
          givenName
        }
      )

      console.log(data)

      if (data.success) {
        navigateTo('/account/signup/steps/verify', {
          params: { givenName, familyName, email }
        })
      }
      if (data.body) {
        if (Array.isArray(data.body?.error)) {
          data.body?.error.forEach((issue) => {
            switch (issue.path[0]) {
              case 'email':
                emailError = issue.message
                break
            }
          })
        } else {
          emailError = data.body?.error as string
        }
      }
    } catch (error) {
      console.error('API call failed:', error)
    }
    loading = false
  }
</script>

<LoadingBar {loading} />
<div class="flex-1 flex flex-col">
  <div class="mb-8">
    <h1>What&apos;s your email?</h1>
    <span class="text-xl">Enter a valid email address</span>
  </div>
  <form class="gap-y-4 flex flex-col" onsubmit={handleSubmit}>
    <div>
      <input type="hidden" name="givenName" value={givenName} />
      <input type="hidden" name="familyName" value={familyName} />
      <md-outlined-text-field
        label="Email address"
        name="email"
        class="w-full"
        required
        autocomplete="email"
        type="email"
        error={emailError}
        error-text={emailError}
      ></md-outlined-text-field>
    </div>
    <div class="w-full flex justify-end">
      <md-filled-button disabled={loading} type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
