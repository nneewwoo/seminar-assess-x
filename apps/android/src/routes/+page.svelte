<script lang="ts">
  import '@material/web/list/list'
  import '@material/web/list/list-item'
  import '@material/web/progress/linear-progress'
  import '@material/web/button/filled-button'
  import type { PageData } from './$types'
  import { api } from '$lib/axios-instance'
  import { useLocalStorage } from '$lib/utils'
  import { CYCLE, CYCLE_PERIOD } from '$lib/store'
  import { goto, invalidate } from '$app/navigation'
  import { get } from 'svelte/store'

  let { data }: { data: PageData } = $props()

  const total_votes = data.props.totalVotes.body.total_votes as number

  let voted = $state(data.props.voted.body.voted as boolean)
  let selected = $state('')

  const handleVote = async () => {
    const res = await api.post('/protected/votes/cast-vote', {
      user_id: useLocalStorage('get', 'user_id'),
      seminar_id: selected,
      cycle_id: $CYCLE.id
    })

    if (res && res.status === 200) {
      selected = ''
      voted = true
      invalidate(`${import.meta.env.VITE_API_URL}/protected/seminar-list`)
      invalidate(`${import.meta.env.VITE_API_URL}/protected/votes/count`)
    }
  }

  const countdown = new Date($CYCLE_PERIOD.ended_at).getTime()
  let timeRemaining = $state({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const calculateTimeRemaining = () => {
    const now = new Date().getTime()
    const distance = countdown - now

    if (distance < 0) {
      timeRemaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
      return
    }
    timeRemaining = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    }
  }

  $effect(() => {
    const interval = setInterval(() => {
      calculateTimeRemaining()
    }, 1000)
    return () => clearInterval(interval)
  })
</script>

<div class="flex-1 flex flex-col gap-y-6 w-full">
  <div class="gap-y-4 flex flex-col py-4">
    <div>
      <h1>Vote for your fave seminar!</h1>
    </div>
  </div>

  <md-list class="gap-4 w-full">
    {#each data.props.seminarList.body.seminar_list as seminar}
      <button
        type="button"
        class={`p-8 cursor-pointer flex flex-col text-left rounded-2xl border border-[var(--md-sys-color-secondary)] ${selected === seminar.id ? 'bg-[var(--md-sys-color-secondary)] text-[var(--md-sys-color-on-secondary)]' : ''}`}
        onclick={() => {
          if (voted) return
          selected = seminar.id
        }}
      >
        <div>
          <h3
            class={`${selected === seminar.id && 'text-[var(--md-sys-color-on-secondary)]'}`}
          >
            {seminar.title}
          </h3>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem beatae
          odio porro.
        </div>
        <div><sub>#{seminar.course}</sub></div>
        {#if voted}
          <div class="w-full pt-8">
            {#if total_votes > 0}
              <md-linear-progress
                max={1}
                value={seminar.number_of_votes / total_votes}
                class="w-full"
              ></md-linear-progress>
            {:else}
              <md-linear-progress max={1} value={0}></md-linear-progress>
            {/if}
          </div>
        {/if}
      </button>
    {/each}
  </md-list>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <md-filled-button
    disabled={selected === '' || voted}
    onclick={handleVote}
    label="Vote"
    >{voted
      ? `${timeRemaining.days}days, ${timeRemaining.hours} hours, ${timeRemaining.seconds} seconds until voting ends`
      : 'Vote'}</md-filled-button
  >
</div>
