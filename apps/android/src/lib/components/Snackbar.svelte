<script lang="ts">
  import '@material/web/icon/icon'
  import '@material/web/iconbutton/icon-button'
  import 'mdui/components/snackbar'

  import { navBarContext, snackBarContext } from '$lib/state.svelte'

  let { element = $bindable() } = $props()
</script>

<mdui-snackbar
  bind:this={element}
  closeable
  message-line="1"
  style={`margin-bottom: ${
    navBarContext.element ? `${navBarContext.element.clientHeight}px` : '0px'
  };`}>
  {snackBarContext.message}
  <md-icon-button slot="close-button">
    <md-icon class="material-symbols-rounded bg-transparent">close</md-icon>
  </md-icon-button>
</mdui-snackbar>
