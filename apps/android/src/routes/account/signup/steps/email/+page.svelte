<script lang="ts">
  import { goto } from '$app/navigation'
  import { api } from '$lib/axios-instance'
  import { TEMP_USER_ID } from '$lib/store'
  import { AxiosError } from 'axios'

  let email = $state('')
  let errorMessage = $state('')

  const handleNext = async () => {
    await api
      .post('/account/signup/steps/email', {
        email: email.trim(),
        temp_userid: $TEMP_USER_ID
      })
      .then((res) => {
        if (res && res.status === 200) {
          goto('/account/signup/steps/password')
        }
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data.message
        }
      })
  }
</script>

<div class="flex-1 flex flex-col gap-y-6">
  <div class="gap-y-4 flex flex-col py-4">
    <div>
      <h1>What's your email?</h1>
    </div>
    <div><span>Enter a valid email address</span></div>
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
  <div class="w-full flex justify-end">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <md-filled-button onclick={handleNext} class="" type="submit"
      >Next</md-filled-button
    >
  </div>
</div>
