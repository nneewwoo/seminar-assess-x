<script lang="ts">
  import '@material/web/button/filled-button'
  import '@material/web/labs/card/filled-card'

  import { appBarContext, sessionContext } from '$lib/state.svelte'
  import { getApi, navigateTo } from '$lib/utils'
  import type { EvaluationCategory } from '$lib/types'

  appBarContext.canGoBack = false
  appBarContext.title = 'Share your thoughts. Your opinion matters!'
  appBarContext.variant = 'large'

  const getEvalCategories = async () => {
    type Response = {
      categories: EvaluationCategory[]
    }
    const response = await getApi<Response>(
      fetch,
      `${import.meta.env.VITE_API_URL}/evaluation/category`
    )

    if (response.success && response.body) {
      const { categories } = response.body
      sessionContext.evaluationCategories = categories
      return categories
    }
  }
</script>

<div class="h-full w-full px-4">
  {#await getEvalCategories()}
    <div class="grid grid-cols-1 gap-y-2">
      {#each [1, 2, 3, 4, 5, 6] as i}
        <md-filled-card class="p-4 bg-transparent">
          <div class="py-4">
            <h2 class="skeleton">Skeleton</h2>
            <div>
              <span class="skeleton">Lorem ipsum dolor sit.</span>
            </div>
          </div>
          <div
            class="w-full border-b border-[var(--md-sys-color-on-background)] opacity-20">
          </div>
          <div class="flex items-center justify-between pt-4">
            <span class="skeleton">0 questions</span>
            <md-filled-button disabled></md-filled-button>
          </div>
        </md-filled-card>
      {/each}
    </div>
  {:then categories}
    {#if categories}
      <div class="grid grid-cols-1 gap-y-2">
        {#each categories as category}
          <md-filled-card class="p-4">
            <div class="py-4">
              <h2>{category.title}</h2>
              <span>{category.description}</span>
            </div>
            <div
              class="w-full border-b border-[var(--md-sys-color-on-background)] opacity-20">
            </div>
            <div class="flex items-center justify-between pt-4">
              <span>{category._count.questions} questions</span>
              <md-filled-button
                role="link"
                href={`/main/test/evaluation/category?category=${category.id}&title=${category.title}&type=${category.type}`}>
                {category.type === 'FEEDBACK' ? 'Write' : 'Rate'}
              </md-filled-button>
            </div>
          </md-filled-card>
        {/each}
      </div>
    {/if}
  {/await}
</div>

<style lang="postcss" module>
  * {
    @apply bg-transparent;
  }
</style>
