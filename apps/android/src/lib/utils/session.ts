import { postApi } from './fetch'
import { sessionContext } from '$lib/state.svelte'

const validate = async (): Promise<boolean> => {
  let valid = false

  type Response = {
    valid: boolean
  }
  const response = await postApi<Response>(
    fetch,
    `${import.meta.env.VITE_API_URL}/account/security/session/validate`,
    { token: sessionContext.token }
  )

  if (response.success && response.body?.valid) {
    valid = response.body.valid
  }
  return valid
}

export { validate }
