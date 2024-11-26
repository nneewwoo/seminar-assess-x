import { goto } from '$app/navigation'

interface QueryProps {
  params?: Record<string, string>
}

const navigateTo = (url: string, query?: QueryProps) => {
  let mainURL = url

  if (query && query.params) {
    mainURL += '?'

    const queries: string[] = []

    for (const [key, value] of Object.entries(query.params))
      queries.push(`${key}=${encodeURIComponent(value)}`)

    mainURL += queries.join('&')
  }

  goto(mainURL)
}

export default navigateTo
