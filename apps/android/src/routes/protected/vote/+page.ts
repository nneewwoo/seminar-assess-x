import { API_URL } from '$lib/config'
import type { PageLoad } from './$types'
import { get } from 'svelte/store'
import { CYCLE } from '$lib/store'

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch(`${API_URL}/protected/seminar-list`, {
      method: 'POST',
      body: JSON.stringify({ cycle_id: get(CYCLE).id }),
      headers: {
        'Content-Type': 'application/json' // Ensure the server knows the content type
      }
    })
    console.log(response)

    return {
      props: {
        seminarList: [] // Use optional chaining to avoid errors
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        seminarList: [] // Return an empty array in case of an error
      }
    }
  }
}
