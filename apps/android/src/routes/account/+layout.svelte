<script lang="ts">
  import '@material/web/button/text-button'
  import { open } from '@tauri-apps/plugin-shell'
  let { children } = $props()
</script>

<div class="mb-5">
  <img src="/logo.png" alt="logo" width="25%" height="25%" />
</div>
<div class="flex-1">
  {@render children()}
</div>
<div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <md-text-button
    onclick={open('https://seminar-assess.vercel.app/pages/privacy-policy')}
  >
    Privacy</md-text-button
  >
</div>
