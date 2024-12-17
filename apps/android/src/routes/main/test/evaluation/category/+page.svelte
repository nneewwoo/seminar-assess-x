<script lang="ts">
  import '@material/web/list/list'
  import '@material/web/list/list-item'
  import '@material/web/iconbutton/icon-button'
  import '@material/web/button/filled-button'
  import '@material/web/labs/card/filled-card'
  import '@material/web/labs/card/elevated-card'
  import '@material/web/textfield/outlined-text-field'
  import 'mdui/components/divider'
  import 'mdui/components/list'
  import 'mdui/components/list-item'
  import 'mdui/components/collapse'
  import 'mdui/components/collapse-item'

  import { appBarContext, appContext, sessionContext } from '$lib/state.svelte'
  import { page } from '$app/stores'
  import { postApi } from '$lib/utils'

  let id = $state('')
  let title = $state('')
  let type = $state('')

  let nextLink = $state('')

  let loading = $state('')

  type EvaluationQuestionDraft = {
    id: string // Draft ID
    userId: string
    evalQuestionId: string
    cycleId: string
    rating: number
    textAnswer?: string
    evalQuestion: {
      id: string
      question: string
      evalId: string
    }
  }

  let drafts: EvaluationQuestionDraft[] = $state([])

  const init = async () => {
    title = $page.url.searchParams.get('title') || ''
    type = $page.url.searchParams.get('type') || ''
    id = $page.url.searchParams.get('category') || ''

    appBarContext.canGoBack = true
    appBarContext.title = title

    const currentIndex = sessionContext.evaluationCategories.findIndex(
      (i) => i.id === id
    )

    const categoriesLength = sessionContext.evaluationCategories.length

    if (currentIndex < categoriesLength - 1) {
      const {
        id: nextId,
        type: nextType,
        title: nextTitle
      } = sessionContext.evaluationCategories[currentIndex + 1]

      nextLink = `/main/test/evaluation/${nextId}?title=${nextTitle}&type=${nextType}`

      appContext.isAnsweringEvaluation = nextLink
    } else {
      nextLink = '/main/test/evaluation/done'
    }
  }

  const getQuestions = async () => {
    type Response = {
      questions: EvaluationQuestionDraft[]
    }

    let response = await postApi<Response>(
      fetch,
      `${import.meta.env.VITE_API_URL}/evaluation/response/start/${id}`,
      { cycleId: sessionContext.cycleId }
    )

    if (response.success && response.body) {
      drafts = response.body.questions
      return response.body.questions
    }
    return []
  }

  const handleStarClick = async (questionId: string, rating: number) => {
    drafts = drafts.map((draft) =>
      draft.evalQuestionId === questionId ? { ...draft, rating } : draft
    )

    await postApi(
      fetch,
      `${import.meta.env.VITE_API_URL}/evaluation/response/update`,
      {
        evalQuestionId: questionId,
        rating,
        evalId: id
      }
    )
  }

  const handleFeedbackSubmit = async (
    event: SubmitEvent,
    questionId: string
  ) => {
    loading = questionId
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const feedback = formData.get('feedback') as string

    drafts = drafts.map((draft) =>
      draft.evalQuestionId === questionId
        ? { ...draft, textAnswer: feedback }
        : draft
    )

    await postApi(
      fetch,
      `${import.meta.env.VITE_API_URL}/evaluation/response/update`,
      {
        evalQuestionId: questionId,
        textAnswer: feedback,
        evalId: id
      }
    )

    loading = ''
  }

  const ratings = [
    { color: 'text-red-500', icon: 'sentiment_very_dissatisfied' },
    { color: 'text-orange-500', icon: 'sentiment_dissatisfied' },
    { color: 'text-green-500', icon: 'sentiment_neutral' },
    { color: 'text-blue-500', icon: 'sentiment_satisfied' },
    { color: 'text-yellow-500', icon: 'sentiment_very_satisfied' },
    { color: 'text-gray-500', icon: 'sentiment_neutral' }
  ]

  $effect(() => {
    init()
  })
</script>

{#if id}
  {#if type === 'RATING'}
    {#await getQuestions()}
      <div class="h-full w-full">
        <md-list>
          <mdui-collapse accordion value={`list-0`}>
            {#each [1, 2, 3, 4] as _, index}
              <mdui-collapse-item value={`list-${index}`}>
                <md-list-item slot="header">
                  <span class="skeleton">
                    Lorem ipsum dolor sit amet nostrum
                  </span>
                  <span class="skeleton">consectetur adipisicing elit. </span>
                  <span class="skeleton">Ducimus suscipit qous?</span>
                  <md-icon
                    slot="start"
                    class={`material-symbols-rounded text-4xl skeleton`}>
                    sentiment_neutral
                  </md-icon>
                </md-list-item>
                <div>
                  <md-list-item>
                    <div slot="headline" class="flex">
                      {#each [1, 2, 3, 4, 5] as star}
                        <div>
                          <md-icon-button role="none">
                            <md-icon
                              class={`material-symbols-rounded skeleton`}>
                              star
                            </md-icon>
                          </md-icon-button>
                        </div>
                      {/each}
                    </div>
                    <md-icon
                      slot="start"
                      class="text-transparent w-fit h-fit material-symbols-rounded">
                      star
                    </md-icon>
                  </md-list-item>
                </div>
              </mdui-collapse-item>
            {/each}
          </mdui-collapse>
        </md-list>
      </div>
    {:then _}
      <div class="h-full w-full">
        <md-list>
          <mdui-collapse accordion value={`list-0`}>
            {#each drafts as q, index}
              <mdui-collapse-item value={`list-${index}`}>
                <md-list-item slot="header">
                  {q.evalQuestion.question}
                  <md-icon
                    slot="start"
                    class={`${q.rating ? ratings[q.rating - 1].color : ratings[5].color} material-symbols-rounded text-4xl w-fit h-fit`}>
                    {q.rating ? ratings[q.rating - 1].icon : ratings[5].icon}
                  </md-icon>
                </md-list-item>
                <div>
                  <md-list-item>
                    <div slot="headline" class="flex">
                      {#each [1, 2, 3, 4, 5] as star}
                        <div>
                          <!-- svelte-ignore a11y_click_events_have_key_events -->
                          <md-icon-button
                            role="button"
                            tabindex="0"
                            onclick={() => {
                              if (star === q.rating) return
                              handleStarClick(q.evalQuestionId, star)
                            }}>
                            <md-icon
                              class={`material-symbols-rounded ${star <= q.rating ? 'filled text-[--md-sys-color-primary]' : 'text-gray-500'}`}>
                              star
                            </md-icon>
                          </md-icon-button>
                        </div>
                      {/each}
                    </div>
                    <md-icon
                      slot="start"
                      class="w-fit h-fit text-transparent material-symbols-rounded">
                      star
                    </md-icon>
                  </md-list-item>
                </div>
              </mdui-collapse-item>
            {/each}
          </mdui-collapse>
        </md-list>
      </div>
    {/await}
  {:else}
    {#await getQuestions()}
      <div class="w-full h-full"></div>
    {:then _}
      <div class="w-full h-full">
        <md-list>
          {#each drafts as f, index}
            <form
              onsubmit={(event) =>
                handleFeedbackSubmit(event, f.evalQuestionId)}>
              <md-list-item>
                {f.evalQuestion.question}
              </md-list-item>
              <div>
                <md-list-item>
                  <div slot="headline">
                    <md-outlined-text-field
                      value={f.textAnswer || ''}
                      class="w-full resize-y"
                      rows="6"
                      name="feedback"
                      type="textarea"
                      placeholder="Tell us what you think..."
                      supporting-text="Please don't include sensitive information"
                      maxlength="256"></md-outlined-text-field>
                  </div>
                </md-list-item>
                <div class="flex justify-end px-4">
                  <md-filled-button
                    disabled={loading === f.evalQuestionId}
                    role="button"
                    type="submit">
                    Send
                  </md-filled-button>
                </div>
              </div>
            </form>
          {/each}
        </md-list>
      </div>
    {/await}
  {/if}
{/if}

<style lang="postcss">
  div,
  md-icon,
  md-icon-button {
    @apply bg-transparent;
  }
</style>
