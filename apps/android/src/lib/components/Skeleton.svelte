<script lang="ts">
  let { children } = $props()
</script>

<div class="w-full h-full p-0">
  {@render children()}
</div>

<style lang="postcss" module>
  div {
    background: linear-gradient(
      0deg,
      var(--skeleton-highlight) 0%,
      var(--skeleton-bg) 50%,
      var(--skeleton-highlight) 100%
    );
    background-size: 100% 200%;
    animation: shimmer var(--skeleton-animation-duration) infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% -100%;
    }
  }
</style>
