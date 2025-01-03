<script lang="ts">
  import { appBarContext } from '$lib/state.svelte'

  appBarContext.canGoBack = false
  appBarContext.title = 'Time to show your progress!'
  appBarContext.variant = 'large'
</script>
