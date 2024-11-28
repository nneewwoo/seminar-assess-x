<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import { z } from 'zod'
  import { goto } from '$app/navigation'
  import { navigateTo } from '$lib/utils'
  import { type IResponse } from '$lib/types'

  type ErrorResponse = { error: z.ZodIssue[] }

  let givenNameError = $state('')
  let familyNameError = $state('')

  const handleSubmit = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement)
    const givenName = formData.get('givenName') as string
    const familyName = formData.get('familyName') as string
    givenNameError = ''
    familyNameError = ''

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/signup/steps/name`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ givenName, familyName })
        }
      )

      const data = (await res.json()) as IResponse<ErrorResponse>

      if (data.success) {
        navigateTo('/account/signup/steps/email', {
          params: { givenName, familyName }
        })
      }

      data.body?.error.forEach((issue) => {
        switch (issue.path[0]) {
          case 'givenName':
            givenNameError = issue.message
            break
          case 'familyName':
            familyNameError = issue.message
            break
        }
      })
    } catch (error) {
      console.error('API call failed:', error)
    }
  }
</script>

<div class="flex-1 flex flex-col">
  <div class="mb-8">
    <h1>Sign up and get started</h1>
    <span class="text-xl">Enter your name</span>
  </div>
  <form class="gap-y-4 flex flex-col" onsubmit={handleSubmit}>
    <div>
      <md-outlined-text-field
        label="First name"
        name="givenName"
        class="w-full"
        autocomplete="first-name"
        type="text"
        error={givenNameError}
        error-text={givenNameError}
      ></md-outlined-text-field>
    </div>
    <div>
      <md-outlined-text-field
        label="Last name"
        name="familyName"
        class="w-full"
        autocomplete="last-name"
        type="text"
        error={familyNameError}
        error-text={familyNameError}
      ></md-outlined-text-field>
    </div>
    <div class="w-full flex justify-end">
      <md-filled-button type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
