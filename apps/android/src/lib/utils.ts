type Action = 'get' | 'set' | 'remove'

const useLocalStorage = (action: Action, key: string, value?: string) => {
  if (action === 'get') {
    return localStorage.getItem(key) ? String(localStorage.getItem(key)!) : null
  }

  if (action === 'set') {
    localStorage.setItem(key, String(value))
  }

  if (action === 'remove') {
    localStorage.removeItem(key)
  }

  return null
}

export { useLocalStorage }
