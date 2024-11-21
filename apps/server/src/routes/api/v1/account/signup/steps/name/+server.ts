import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import { type RequestHandler } from '@sveltejs/kit'

const POST: RequestHandler = async ({ request }) => {
  const { given_name, family_name } = await request.json()

  const user = await prisma.temp_user.create({
    data: {
      given_name,
      family_name,
      email: '',
      password: ''
    }
  })

  return JsonResponse('Temp-user created', { user_id: user.id }, 201)
}

export { POST }
