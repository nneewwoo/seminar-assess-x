<script lang="ts">
  import '@material/web/icon/icon'
  import '@material/web/button/filled-button'
  import '@material/web/fab/fab'
  import '@material/web/list/list'
  import '@material/web/list/list-item'
  import '@material/web/labs/card/outlined-card'
  import '@material/web/labs/card/filled-card'
  import '@material/web/progress/linear-progress'
  import 'mdui/components/fab'

  import {
    appBarContext,
    sessionContext,
    snackBarContext
  } from '$lib/state.svelte'
  import { getApi, postApi } from '$lib/utils'
  import type { Seminar } from '$lib/types'

  appBarContext.canGoBack = false
  appBarContext.title = 'Cast your vote!'
  appBarContext.variant = 'large'

  let selectedSeminarId = $state('')

  let userCastingVote = $state(false)

  let numTotalVotes = $state(0)

  let seminars: Seminar[] = $state([])

  let voted: boolean = $state(false)

  const getTitles = async () => {
    type Response = {
      seminars: Seminar[]
    }
    const response = await getApi<Response>(
      fetch,
      `${import.meta.env.VITE_API_URL}/seminar/list`
    )

    if (response.success && response.body) {
      const { seminars: sem } = response.body
      sem.map((s) => {
        numTotalVotes += s.numberOfVotes

        if (s.votedByUser) voted = true
      })
      seminars = sem
    }
    return []
  }

  const userCastVote = async () => {
    userCastingVote = true
    const response = await postApi<null>(
      fetch,
      `${import.meta.env.VITE_API_URL}/votes/user/cast`,
      { cycleId: sessionContext.cycleId, seminarId: selectedSeminarId }
    )
    voted = true
    numTotalVotes += 1
    seminars = seminars.map((s) => {
      if (s.id === selectedSeminarId) {
        return { ...s, numberOfVotes: s.numberOfVotes + 1, votedByUser: true }
      }
      return s
    })

    if (response.success) {
      if (snackBarContext.element) {
        snackBarContext.message = 'Vote counted! Thanks for participating.'
        snackBarContext.element.open = true
      }
      userCastingVote = false
    }
  }
</script>

<div class="w-full h-full relative">
  {#await getTitles()}
    <div class="w-full h-full px-4">
      <md-list class="gap-y-2">
        {#each [1, 2, 3, 4, 5] as _}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div id="seminar-container">
            <md-list-item
              class={`rounded-2xl bg-[var(--md-sys-color-surface-dim)]`}
              role="list">
              <div class="text-transparent" slot="headline">
                <strong class="skeleton">Lorem ipsum</strong>
              </div>
              <div class={`text-transparent`} slot="supporting-text">
                <span class="skeleton">Lorem ipsum dolor sit.</span>
              </div>
            </md-list-item>
          </div>
        {/each}
      </md-list>
    </div>
  {:then _}
    {#if voted}
      <div class="w-full h-full px-4">
        <md-list role="list" class="gap-y-2">
          {#each seminars as seminar}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div id="seminar-container">
              <md-list-item
                class={`rounded-2xl relative ${
                  seminar.votedByUser
                    ? 'bg-[var(--md-sys-color-primary-semi)] text-[var(--md-sys-color-on-primary)]'
                    : 'bg-[var(--md-sys-color-primary-container-semi)] text-[var(--md-sys-color-on-primary-container)]'
                }`}
                role="listitem">
                <div class="absolute top-0 left-0 w-full h-full z-0">
                  <md-linear-progress
                    style={`${seminar.votedByUser ? '--md-linear-progress-active-indicator-color: var(--md-sys-color-primary);' : '--md-linear-progress-active-indicator-color: var(--md-sys-color-primary-container);'}`}
                    value={seminar.numberOfVotes / numTotalVotes}
                  ></md-linear-progress>
                </div>
                <strong
                  class={`relative z-10 ${
                    seminar.votedByUser
                      ? 'text-[var(--md-sys-color-on-primary)]'
                      : 'text-[var(--md-sys-color-on-primary-container)]'
                  }`}
                  slot="headline">
                  {seminar.title}
                </strong>
                <div
                  class={`relative z-10 ${
                    seminar.votedByUser
                      ? 'text-[var(--md-sys-color-on-primary)]'
                      : 'text-[var(--md-sys-color-on-primary-container)]'
                  }`}
                  slot="supporting-text">
                  {seminar.description}
                </div>
                <span class="relative z-10 italic" slot="end">
                  {Number((seminar.numberOfVotes / numTotalVotes).toFixed(2)) *
                    100}%
                </span>
              </md-list-item>
            </div>
          {/each}
        </md-list>
      </div>
    {:else}
      <div class="w-full h-full px-4">
        <md-list role="radiogroup" class="gap-y-2">
          {#each seminars as seminar}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div id="seminar-container">
              <md-list-item
                class={`rounded-2xl ${
                  seminar.votedByUser || seminar.id === selectedSeminarId
                    ? 'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]'
                    : 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]'
                }`}
                role="radio"
                tabindex="0"
                aria-checked={seminar.votedByUser ||
                  seminar.id === selectedSeminarId}
                onclick={() => (selectedSeminarId = seminar.id)}>
                <strong
                  class={`${
                    seminar.votedByUser || seminar.id === selectedSeminarId
                      ? 'text-[var(--md-sys-color-on-primary)]'
                      : 'text-[var(--md-sys-color-on-primary-container)]'
                  }`}
                  slot="headline">
                  {seminar.title}
                </strong>
                <div
                  class={`${
                    seminar.votedByUser || seminar.id === selectedSeminarId
                      ? 'text-[var(--md-sys-color-on-primary)]'
                      : 'text-[var(--md-sys-color-on-primary-container)]'
                  }`}
                  slot="supporting-text">
                  {seminar.description}
                </div>
                <md-icon
                  slot="end"
                  class={`material-symbols-rounded filled ${
                    seminar.votedByUser || seminar.id === selectedSeminarId
                      ? 'text-[var(--md-sys-color-on-primary)]'
                      : 'text-[var(--md-sys-color-on-primary-container)]'
                  }`}>
                  {seminar.votedByUser || seminar.id === selectedSeminarId
                    ? 'check_box'
                    : 'check_box_outline_blank'}
                </md-icon>
              </md-list-item>
            </div>
          {/each}
        </md-list>
      </div>
      <div class="px-4 flex justify-end">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <md-filled-button
          role="button"
          tabindex="0"
          onclick={userCastVote}
          disabled={!selectedSeminarId || userCastingVote}
          class="">
          Make your pick
        </md-filled-button>
      </div>
    {/if}
  {/await}
</div>

<style lang="postcss" module>
  *:not(md-list-item) {
    @apply bg-transparent;
  }

  :root {
    --md-linear-progress-track-height: 100%;
    --md-linear-progress-track-shape: 0;
    --md-linear-progress-active-indicator-height: 100%;
    --md-linear-progress-track-color: transparent;
  }
</style>
