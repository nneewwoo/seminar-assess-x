<script lang="ts">
  import { appBarContext } from '$lib/state.svelte'

  let { children } = $props()
  appBarContext.canGoBack = false
</script>

{@render children()}
