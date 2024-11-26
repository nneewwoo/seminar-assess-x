import prisma from '$lib/prisma'
import { json, type RequestHandler } from '@sveltejs/kit'
import { z } from 'zod'

const POST: RequestHandler = async ({ request }) => {
  const { email, givenName, familyName, password, confirm } =
    await request.json()

  try {
    const valid = z
      .object({
        password: z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long' }),
        confirm: z.string().min(1, { message: 'Please confirm your password' })
      })
      .refine((data) => data.password === data.confirm, {
        message: 'Passwords do not match. Try again.'
      })
      .parse({ password, confirm })

    if (valid) {
      await prisma.user.create({
        data: {
          email,
          password,
          givenName,
          familyName
        }
      })
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
