<script lang="ts">
  import '$lib/styles/index.css'
  import '$lib/styles/prose.css'
  import 'mdui/mdui.css'
  import '@material/web/labs/navigationbar/navigation-bar'
  import '@material/web/labs/navigationtab/navigation-tab'
  import '@material/web/icon/icon'
  import { appBarContext, appContext } from '$lib/state.svelte'
  import { onMount } from 'svelte'
  import Snackbar from '$lib/components/Snackbar.svelte'

  let { children } = $props()

  let initialViewportHeight = $state(0)

  onMount(() => {
    if (typeof window !== undefined && window.visualViewport !== null) {
      initialViewportHeight = window.visualViewport!.height
    }
  })

  const handleResize = () => {
    if (typeof window !== undefined && window.visualViewport !== null) {
      let visible = initialViewportHeight > window.visualViewport.height
      appContext.isKeyboardVisible = visible
      if (visible) {
        appContext.mainElement?.scrollTo(0, appContext.mainElement.offsetHeight)
      }
    }
  }
</script>

<svelte:window onresize={handleResize} />

<main class="prose w-screen h-screen flex flex-col">
  {@render children()}
</main>
