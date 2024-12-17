<script lang="ts">
  import { appBarContext } from '$lib/state.svelte'

  let { children } = $props()
  appBarContext.title = 'Rate and provide your feedback.'
</script>

{@render children()}
