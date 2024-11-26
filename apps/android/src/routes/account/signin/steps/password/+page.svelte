<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/button/text-button'

  import { page } from '$app/stores'
  import { api } from '$lib/axios-instance'
  import { z } from 'zod'
  import { navigateTo, useLocalStorage } from '$lib/utils'
  import { goto } from '$app/navigation'

  type Response = { error: string; token: string }

  let passwordError = $state('')
  let show = $state(false)

  const name = $page.url.searchParams.get('name') as string
  const email = $page.url.searchParams.get('email') as string

  const handleSubmit = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement)
    const password = formData.get('password') as string
    passwordError = ''

    if (!password) {
      return (passwordError = 'Password is required to continue')
    }

    try {
      const res = await api.post<Response>('/account/signin/steps/password', {
        email,
        password
      })

      if (res.success) {
        useLocalStorage('set', 'session-token', res.body?.token)
        navigateTo('/')
      }

      if (res.body) {
        passwordError = res.body.error
      }
    } catch (error) {
      console.error('API call failed:', error)
    }
  }
</script>

<div class="flex-1 flex flex-col">
  <div class="mb-8">
    <h1>Welcome, {name}</h1>
    <span class="text-xl">Enter your password to continue</span>
  </div>
  <form class="gap-y-4 flex flex-col" onsubmit={handleSubmit}>
    <div>
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
    <div class="w-full flex justify-end">
      <md-filled-button type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
