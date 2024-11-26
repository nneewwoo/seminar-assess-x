<script lang="ts">
  let { children } = $props()
</script>

<div class="mb-5">
  <img src="/logo.png" alt="logo" width="25%" height="25%" />
</div>
{@render children()}
