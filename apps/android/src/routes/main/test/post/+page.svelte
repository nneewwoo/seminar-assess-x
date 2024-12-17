<script lang="ts">
  import { appBarContext } from '$lib/state.svelte'

  appBarContext.canGoBack = false
  appBarContext.title = 'Post'
  appBarContext.variant = 'large'
</script>
