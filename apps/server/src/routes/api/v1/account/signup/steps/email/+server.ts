import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import { type RequestHandler } from '@sveltejs/kit'
import { z } from 'zod'

const POST: RequestHandler = async ({ request }) => {
  const { email, temp_userid } = await request.json()

  try {
    if (z.string().email().parse(email)) {
      const user = await prisma.temp_user.update({
        where: { id: temp_userid },
        data: { email }
      })
      return JsonResponse('Temp-user email updated', { user_id: user.id })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return JsonResponse(error.errors[0].message, null, 400)
    }
  }
  return JsonResponse('Oops something went wrong', null, 400)
}

export { POST }
