<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/button/text-button'
  import { goto } from '$app/navigation'
  import { api } from '$lib/axios-instance'
  import { useLocalStorage } from '$lib/utils'
  import { AxiosError } from 'axios'

  let password = $state('')

  const name = useLocalStorage('get', 'given_name') || 'user'
  const email = useLocalStorage('get', 'email') || 'user'

  let errorMessage = $state('')

  const handleNext = async () => {
    try {
      const res = await api.post('/account/signin/steps/password', {
        email,
        password
      })
      if (res && res.status === 200) {
        useLocalStorage('remove', 'email')
        useLocalStorage('remove', 'given_name')
        useLocalStorage('set', 'jwt_token', res.data.body.token)
        goto('/')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if ((error.response?.data.message as string).includes('Oops')) {
          return goto('/account/signin/steps/oops')
        }
        errorMessage = error.response?.data.message
      }
    }
  }
</script>

<div class="flex-1 flex flex-col gap-y-6">
  <div class="gap-y-4 flex flex-col py-4">
    <div>
      <h1>Welcome, {name}</h1>
    </div>
    <div><span>Enter your password to continue</span></div>
  </div>
  <div class="gap-y-4 flex flex-col">
    <div>
      <md-outlined-text-field
        onchange={(e: Event) =>
          (password = (e.target as HTMLInputElement).value)}
        label="Password"
        class="w-full"
        type="password"
        error={errorMessage}
        error-text={errorMessage}
      ></md-outlined-text-field>
    </div>
  </div>
  <div class="w-full flex justify-end">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <md-filled-button onclick={handleNext} class="" type="submit"
      >Next</md-filled-button
    >
  </div>
</div>
