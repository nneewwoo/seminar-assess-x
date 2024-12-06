<script lang="ts">
  import '$lib/styles/index.css'
  import '$lib/styles/prose.css'
  import 'mdui/mdui.css'
  import '@material/web/labs/navigationbar/navigation-bar'
  import '@material/web/labs/navigationtab/navigation-tab'
  import '@material/web/icon/icon'

  let { children } = $props()
</script>

<main class="prose h-screen w-screen flex flex-col">
  {@render children()}
</main>
