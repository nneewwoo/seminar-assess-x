<script lang="ts">
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/filled-button'
  import '@material/web/checkbox/checkbox'
  import { api } from '$lib/axios-instance'
  import { goto } from '$app/navigation'
  import { TEMP_USER_ID } from '$lib/store'
  import { AxiosError } from 'axios'

  let password = $state('')
  let confirm = $state('')

  let show = $state(false)

  let errorMessage = $state('')

  const handleNext = async () => {
    if (password === '') {
      return (errorMessage = 'Enter your password')
    }
    if (confirm === '') {
      return (errorMessage = 'Confirm your password')
    }
    await api
      .post('/account/signup/steps/password', {
        password: password,
        confirm_password: confirm,
        temp_userid: $TEMP_USER_ID
      })
      .then((res) => {
        if (res && res.status === 200) {
          TEMP_USER_ID.set('')
          goto('/account/signup/steps/done')
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
      <h1>Create a strong password</h1>
    </div>
    <div><span>Your password must be unique and hard to guess</span></div>
  </div>
  <div class="gap-y-4 flex flex-col">
    <div>
      <md-outlined-text-field
        onchange={(e: Event) =>
          (password = (e.target as HTMLInputElement).value)}
        label="Password"
        class="w-full"
        type={show ? 'text' : 'password'}
        error={errorMessage}
      ></md-outlined-text-field>
    </div>
    <div>
      <md-outlined-text-field
        onchange={(e: Event) =>
          (confirm = (e.target as HTMLInputElement).value)}
        label="Confirm"
        class="w-full"
        type={show ? 'text' : 'password'}
        error={errorMessage}
        error-text={errorMessage}
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
  </div>
  <div class="w-full flex justify-end">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <md-filled-button onclick={handleNext} class="" type="submit"
      >Next</md-filled-button
    >
  </div>
</div>
