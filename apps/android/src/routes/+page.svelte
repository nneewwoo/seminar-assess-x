<script lang="ts">
  import { api } from '$lib/axios-instance'

  const handleButton = async () => {
    const res = await api.get('/')

    console.log(res)
  }
</script>

<button onclick={handleButton}>Click me</button>
