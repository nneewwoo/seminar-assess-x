import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import type { RequestHandler } from '@sveltejs/kit'

const POST: RequestHandler = async ({ request }) => {
  const { user_id, seminar_id, cycle_id } = await request.json()

  await prisma.votes.create({
    data: {
      user_id,
      seminar_id,
      cycle_id
    }
  })

  await prisma.seminar.update({
    where: { id: seminar_id },
    data: {
      number_of_votes: {
        increment: 1
      }
    }
  })

  return JsonResponse('OK', null)
}

export { POST }
