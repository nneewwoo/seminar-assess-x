import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import type { RequestHandler } from '@sveltejs/kit'

const POST: RequestHandler = async ({ locals, request }) => {
  // TODO: Should come from the JWT token
  // const { id } = locals.user

  const { cycle_id, user_id } = await request.json()

  const voted = await prisma.votes.findFirst({
    where: { user_id, cycle_id }
  })
  return JsonResponse('OK', { voted: voted ? true : false })
}

export { POST }
