<script lang="ts">
  import '$lib/styles/index.css'
  import '$lib/styles/prose.css'

  let { children } = $props()
</script>

<main class="prose">
  {@render children()}
</main>
