<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import { page } from '$app/stores'
  import { z } from 'zod'
  import { navigateTo } from '$lib/utils'
  import { type IResponse } from '$lib/types'

  type ErrorResponse = { error: z.ZodIssue[] | string }

  let emailError = $state('')

  const givenName = $page.url.searchParams.get('givenName') as string
  const familyName = $page.url.searchParams.get('familyName') as string

  const handleSubmit = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get('email') as string
    emailError = ''

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/signup/steps/email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        }
      )

      const data = (await res.json()) as IResponse<ErrorResponse>

      if (data.success) {
        navigateTo('/account/signup/steps/password', {
          params: { givenName, familyName, email }
        })
      }
      if (res.body) {
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
  }
</script>

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
        autocomplete="email"
        type="email"
        error={emailError}
        error-text={emailError}
      ></md-outlined-text-field>
    </div>
    <div class="w-full flex justify-end">
      <md-filled-button type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
