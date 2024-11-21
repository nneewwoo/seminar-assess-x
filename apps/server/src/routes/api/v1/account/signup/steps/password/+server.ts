import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import { type RequestHandler } from '@sveltejs/kit'
import { z } from 'zod'

const POST: RequestHandler = async ({ request }) => {
  const { password, confirm_password, temp_userid } = await request.json()

  const passwordValidation = z
    .object({
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
      confirm_password: z.string()
    })
    .refine((data) => data.password === data.confirm_password, {
      message: 'Passwords do not match. Try again.'
    })

  try {
    if (passwordValidation.parse({ password, confirm_password })) {
      const tempuser = await prisma.temp_user.update({
        where: { id: temp_userid },
        data: { password }
      })

      const user = await prisma.user.create({
        data: {
          email: tempuser.email,
          password: tempuser.password,
          given_name: tempuser.given_name,
          family_name: tempuser.family_name
        }
      })

      await prisma.temp_user.delete({ where: { id: temp_userid } })

      return JsonResponse('New user created', { user_id: user.id })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return JsonResponse(error.errors[0].message, null, 400)
    }
  }
  return JsonResponse('Oops something went wrong', null, 400)
}

export { POST }
