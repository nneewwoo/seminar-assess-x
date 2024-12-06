<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/button/text-button'
  import '@material/web/checkbox/checkbox'

  import { page } from '$app/stores'
  import { navigateTo, useLocalStorage } from '$lib/utils'
  import { type IResponse } from '$lib/types'
  import { SESSION_TOKEN } from '$lib/store'
  import { postApi } from '$lib/utils/fetch'

  type Response = { error: string; token: string }

  let loading = $state(false)

  let passwordError = $state('')
  let show = $state(false)

  const name = $page.url.searchParams.get('name') as string
  const email = $page.url.searchParams.get('email') as string

  const handleSubmit = async (event: SubmitEvent) => {
    loading = true
    const formData = new FormData(event.target as HTMLFormElement)
    const password = formData.get('password') as string
    passwordError = ''

    if (!password) {
      return (passwordError = 'Password is required to continue')
    }

    try {
      const data = await postApi<Response>(
        fetch,
        `${import.meta.env.VITE_API_URL}/account/signin/steps/password`,
        {
          email,
          password
        }
      )

      if (data.success) {
        useLocalStorage('set', 'session-token', data.body?.token)
        SESSION_TOKEN.set(data.body?.token)
        navigateTo('/', undefined, { replaceState: true })
      }

      if (data.body) {
        passwordError = data.body?.error as string
      }
    } catch (error) {
      console.error('API call failed:', error)
    }
    loading = false
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
        required
        type={show ? 'text' : 'password'}
        error={passwordError}
        error-text={passwordError}></md-outlined-text-field>
      <div class="flex pt-2 relative h-8">
        <md-checkbox
          role="checkbox"
          aria-checked={show}
          onchange={(e: Event) =>
            (show = (e.target as HTMLInputElement).checked)}
          id="show-password"
          class="-left-2 top-3 absolute h-[18px] w-[18px]"
          touch-target="wrapper"></md-checkbox>
        <div class="left-10 absolute">
          <label for="show-password">Show password</label>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <md-filled-button disabled={loading} type="submit">Next</md-filled-button>
    </div>
  </form>
</div>
