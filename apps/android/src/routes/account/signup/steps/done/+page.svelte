<script lang="ts">
  import { goto } from '$app/navigation'
  import '@material/web/button/filled-button'

  const handleNext = () => {
    goto('/account/signin/steps/email')
  }
</script>

<div class="flex-1 flex flex-col gap-y-6">
  <div class="gap-y-4 flex flex-col py-4">
    <div>
      <h1>All done!</h1>
    </div>
    <div><span>Your account is successfully created</span></div>
  </div>
  <div class="w-full flex justify-end">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <md-filled-button onclick={handleNext} type="button"
      >Sign in</md-filled-button
    >
  </div>
</div>
