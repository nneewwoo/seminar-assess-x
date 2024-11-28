<script lang="ts">
  import { page } from '$app/stores'
</script>

<main>
  ERROR
  <h1>{$page.error?.message}</h1>
</main>
