import { json, type RequestHandler } from '@sveltejs/kit'
import { z } from 'zod'

const POST: RequestHandler = async ({ request }) => {
  const { givenName, familyName } = await request.json()

  try {
    const valid = z
      .object({
        givenName: z.string().min(1, { message: 'First name is required' }),
        familyName: z.string().min(1, { message: 'Last name is required' })
      })
      .parse({ givenName, familyName })

    if (valid) {
      return json({ success: true })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ success: false, body: { error: error.errors } })
    }
  }
  return json({ success: false, error: 'unknown' })
}

export { POST }
