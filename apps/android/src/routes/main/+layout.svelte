<script lang="ts">
  import '@material/web/labs/navigationbar/navigation-bar'
  import '@material/web/labs/navigationtab/navigation-tab'
  import '@material/web/icon/icon'
  import '@material/web/iconbutton/icon-button'
  import '@material/web/menu/menu'
  import '@material/web/menu/menu-item'
  import 'mdui/components/navigation-bar'
  import 'mdui/components/navigation-bar-item'
  import 'mdui/components/layout'
  import 'mdui/components/layout-item'
  import 'mdui/components/layout-main'

  import TopAppBar from '$lib/components/TopAppBar.svelte'
  import { page } from '$app/stores'
  import { appContext, navBarContext, snackBarContext } from '$lib/state.svelte'
  import Snackbar from '$lib/components/Snackbar.svelte'

  let { children } = $props()

  let path = $derived($page.url.pathname)

  const routes = {
    vote: {
      name: 'Vote',
      url: '/main/vote',
      icon: 'ballot'
    },
    pretest: {
      name: 'Pre-test',
      url: '/main/test/pre',
      icon: 'data_alert'
    },
    posttest: {
      name: 'Post-test',
      url: '/main/test/post',
      icon: 'data_check'
    },
    eval: {
      name: 'Evaluation',
      url: '/main/test/evaluation',
      icon: 'checklist_rtl'
    }
  }
</script>

<mdui-layout class="h-full w-full flex flex-col">
  <TopAppBar />
  <mdui-layout-main class="h-full main" bind:this={appContext.mainElement}>
    <div class="pb-8">
      {@render children()}
    </div>
    <Snackbar bind:element={snackBarContext.element} />
  </mdui-layout-main>
  {#if !appContext.isKeyboardVisible}
    <mdui-navigation-bar
      bind:this={navBarContext.element}
      hide={!Object.values(routes).some((route) => path.startsWith(route.url))}
      label-visibility="labeled"
      value={path}>
      {#each Object.entries(routes) as [key, route]}
        <mdui-navigation-bar-item href={route.url} {key} value={route.url}>
          {route.name}
          <md-icon
            slot="active-icon"
            class="material-symbols-rounded filled bg-transparent">
            {route.icon}
          </md-icon>
          <md-icon slot="icon" class="material-symbols-rounded bg-transparent">
            {route.icon}
          </md-icon>
        </mdui-navigation-bar-item>
      {/each}
    </mdui-navigation-bar>
  {/if}
</mdui-layout>
