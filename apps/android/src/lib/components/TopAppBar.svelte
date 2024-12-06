<script lang="ts">
  import '@material/web/icon/icon'
  import '@material/web/iconbutton/icon-button'
  import type { MdMenu } from '@material/web/menu/menu'
  import 'mdui/components/top-app-bar'
  import 'mdui/components/top-app-bar-title'
  import { appBarContext } from '$lib/state.svelte'

  let menu: MdMenu

  let title = $derived(appBarContext.title)
</script>

<mdui-top-app-bar
  scroll-target=".main"
  variant={appBarContext.variant}
  scroll-behavior="elevate shrink">
  {#if appBarContext.canGoBack}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <md-icon-button
      role="button"
      tabindex="0"
      onclick={() => window.history.back()}>
      <md-icon class="material-symbols-rounded bg-transparent">
        arrow_back
      </md-icon>
    </md-icon-button>
  {/if}
  <mdui-top-app-bar-title class={`${!appBarContext.canGoBack && 'pl-2'}`}
    >{appBarContext.title}<span slot="label-large">{appBarContext.title}</span
    ></mdui-top-app-bar-title>
  <div style="flex-grow: 1"></div>
  <span class="relative">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <md-icon-button
      tabindex="0"
      role="button"
      onclick={() => (menu.open = !menu.open)}
      id="menu-anchor">
      <md-icon class="material-symbols-rounded bg-transparent">
        more_vert
      </md-icon>
    </md-icon-button>
    <md-menu quick bind:this={menu} id="menu" anchor="menu-anchor">
      <md-menu-item href="/main/settings">
        <div id="headline" slot="headline">Settings</div>
      </md-menu-item>
      <md-menu-item href="/account/signout">
        <div id="headline" slot="headline">Logout</div>
      </md-menu-item>
    </md-menu>
  </span>
</mdui-top-app-bar>

<style lang="postcss" module>
  md-menu-item,
  #headline {
    @apply bg-transparent;
  }
</style>
