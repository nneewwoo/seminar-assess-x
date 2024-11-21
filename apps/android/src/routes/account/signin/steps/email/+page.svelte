<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/button/text-button'
  import { goto } from '$app/navigation'
  import { api } from '$lib/axios-instance'
  import { useLocalStorage } from '$lib/utils'
  import { AxiosError } from 'axios'

  let email = $state('')

  let errorMessage = $state('')

  const handleNext = async () => {
    try {
      const res = await api.post('/account/signin/steps/email', {
        email: email.trim()
      })
      if (res && res.status === 200) {
        useLocalStorage('set', 'email', email)
        useLocalStorage('set', 'given_name', res.data.body.given_name)
        useLocalStorage('set', 'user_id', res.data.body.id)
        goto('/account/signin/steps/password')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message
      }
    }
  }
</script>

<div class="flex-1 flex flex-col gap-y-6">
  <div class="gap-y-4 flex flex-col py-4">
    <div>
      <h1>Sign in</h1>
    </div>
    <div><span>Enter your email address</span></div>
  </div>
  <div class="gap-y-4 flex flex-col">
    <div>
      <md-outlined-text-field
        onchange={(e: Event) => (email = (e.target as HTMLInputElement).value)}
        label="Email address"
        class="w-full"
        autocomplete="email"
        type="email"
        error={errorMessage}
        error-text={errorMessage}
      ></md-outlined-text-field>
    </div>
  </div>
  <div class="w-full flex justify-between">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <md-text-button
      onclick={() => goto('/account/signup/steps/name')}
      class="-ml-3"
      type="submit">Register</md-text-button
    >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <md-filled-button onclick={handleNext} class="" type="submit"
      >Next</md-filled-button
    >
  </div>
</div>
