<script lang="ts">
  import { api } from '$lib/axios-instance'
  import { useLocalStorage } from '$lib/utils'
  import axios from 'axios'

  const handleButton = async () => {
    const token = useLocalStorage('get', 'session-token')
    console.log(token)
    const res = await axios.get('http://192.168.254.102:5174/api/v1', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    // const res = await fetch('http://192.168.254.102:5174/api/v1', {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   }
    // })

    // const res = api.get('/', { headers: { Authorization: `Bearer ${token}` } })

    console.log(res)
  }
</script>

<button onclick={handleButton}>Click me</button>
