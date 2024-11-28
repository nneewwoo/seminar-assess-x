<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/checkbox/checkbox'
  import { api } from '$lib/axios-instance'
  import { z } from 'zod'
  import { navigateTo } from '$lib/utils'
  import { page } from '$app/stores'
  import { type IResponse } from '$lib/types'

  type ErrorResponse = { error: z.ZodIssue[] }

  let passwordError = $state('')
  let confirmError = $state('')
  let customError = $state('')

  let show = $state(false)

  const givenName = $page.url.searchParams.get('givenName') as string
  const familyName = $page.url.searchParams.get('familyName') as string
  const email = $page.url.searchParams.get('email') as string

  const handleSubmit = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string
    passwordError = ''
    confirmError = ''

    if (!password) {
      return (passwordError = 'Password is required')
    }

    if (!confirm) {
      return (confirmError = 'Please confirm your password')
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/signup/steps/password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            givenName,
            familyName,
            email,
            password,
            confirm
          })
        }
      )

      const data = (await res.json()) as IResponse<ErrorResponse>

      if (data.success) {
        navigateTo('/account/signup/steps/done')
      }

      data.body?.error.forEach((issue) => {
        switch (issue.path[0]) {
          case 'password':
            passwordError = issue.message
            break
          case 'confirm':
            confirmError = issue.message
            break
        }
        customError = issue.message
      })
    } catch (error) {
      console.error('API call failed:', error)
    }
  }
</script>

<div class="flex-1 flex flex-col">
  <div class="mb-8">
    <h1>Create a strong password</h1>
    <span>Your password must be unique and hard to guess</span>
  </div>
  <form class="gap-y-4 flex flex-col" onsubmit={handleSubmit}>
    <div>
      <input type="hidden" name="givenName" value={givenName} />
      <input type="hidden" name="familyName" value={familyName} />
      <input type="hidden" name="email" value={email} />
      <md-outlined-text-field
        label="Password"
        name="password"
        class="w-full"
        type={show ? 'text' : 'password'}
        error={passwordError}
        error-text={passwordError}
      ></md-outlined-text-field>
    </div>
    <div>
      <md-outlined-text-field
        label="Confirm"
        name="confirm"
        class="w-full"
        type={show ? 'text' : 'password'}
        error={confirmError || customError}
        error-text={confirmError || customError}
      ></md-outlined-text-field>
      <div class="flex pt-2 relative h-8">
        <md-checkbox
          onchange={(e: Event) =>
            (show = (e.target as HTMLInputElement).checked)}
          id="show-password"
          class="-left-2 top-3 absolute h-[18px] w-[18px]"
          touch-target="wrapper"
        ></md-checkbox>
        <div class="left-10 absolute">
          <label for="show-password">Show password</label>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <md-filled-button type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
