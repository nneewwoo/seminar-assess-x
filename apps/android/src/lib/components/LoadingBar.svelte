<script lang="ts">
  import '@material/web/progress/linear-progress'
  let { loading = false } = $props()
</script>

{#if loading}
  <div class="w-full absolute top-0 left-0">
    <div class="w-full p-[2px]">
      <md-linear-progress indeterminate class="w-full"></md-linear-progress>
    </div>
  </div>
{/if}

<style module>
  md-linear-progress {
    --md-linear-progress-track-height: 0.25rem;
  }
</style>
