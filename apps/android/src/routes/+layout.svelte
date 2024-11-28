<script lang="ts">
  import '$lib/styles/index.css'
  import '$lib/styles/prose.css'

  let { children } = $props()
</script>

<main class="prose p-8 h-screen w-screen flex flex-col">
  {@render children()}
</main>
