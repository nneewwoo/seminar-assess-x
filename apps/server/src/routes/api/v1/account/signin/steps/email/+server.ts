import prisma from '$lib/prisma'
import { error, type RequestHandler } from '@sveltejs/kit'
import { JsonResponse } from '$lib/utils'

const POST: RequestHandler = async ({ request }) => {
  const { email } = await request.json()

  const user = await prisma.user.findUnique({
    where: { email },
    select: { given_name: true, id: true }
  })

  if (!user) throw error(401, 'Could not find user with that email')

  return JsonResponse('User email OK', user)
}

export { POST }
