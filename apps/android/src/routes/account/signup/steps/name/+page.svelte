<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import { api } from '$lib/axios-instance'
  import { goto } from '$app/navigation'
  import { TEMP_USER_ID } from '$lib/store'

  let firstName = $state('')
  let lastName = $state('')

  const handleNext = async () => {
    const res = await api.post('/account/signup/steps/name', {
      given_name: firstName.trim(),
      family_name: lastName.trim()
    })

    if (res && res.data.message === 'Temp-user created') {
      TEMP_USER_ID.set(res.data.body.user_id)
      goto('/account/signup/steps/email')
    }
  }
</script>

<div class="flex-1 flex flex-col gap-y-6">
  <div class="gap-y-4 flex flex-col py-4">
    <div>
      <h1>Sign up and get started</h1>
    </div>
    <div><span>Enter your name</span></div>
  </div>
  <div class="gap-y-4 flex flex-col">
    <div>
      <md-outlined-text-field
        onchange={(e: Event) =>
          (firstName = (e.target as HTMLInputElement).value)}
        label="First name"
        class="w-full"
        autocomplete="first-name"
        type="text"
      ></md-outlined-text-field>
    </div>
    <div>
      <md-outlined-text-field
        onchange={(e: Event) =>
          (lastName = (e.target as HTMLInputElement).value)}
        label="Last name"
        class="w-full"
        autocomplete="last-name"
        type="text"
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
