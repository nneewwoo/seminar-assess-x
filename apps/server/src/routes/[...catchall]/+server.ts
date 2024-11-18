import { json } from '@sveltejs/kit'

const GET = async () => {
  return json({ message: 'Server running...', status: 200 })
}

export { GET }
