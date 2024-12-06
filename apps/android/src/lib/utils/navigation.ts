import { goto } from '$app/navigation'

interface QueryProps {
  params?: Record<string, string>
}

interface Opts {
  replaceState: boolean
}

const navigateTo = (url: string, query?: QueryProps, opts?: Opts) => {
  let mainURL = url

  if (query && query.params) {
    mainURL += '?'

    const queries: string[] = []

    for (const [key, value] of Object.entries(query.params))
      queries.push(`${key}=${encodeURIComponent(value)}`)

    mainURL += queries.join('&')
  }

  goto(mainURL, opts)
}

export default navigateTo
