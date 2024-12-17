import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

const POST: RequestHandler = async ({ locals, request }) => {
  const { seminarId, cycleId } = await request.json()
  const userId = locals.user.id

  if (typeof seminarId !== 'undefined') {
    await prisma.vote.create({
      data: {
        userId,
        seminarId,
        cycleId
      }
    })

    return json({ success: true })
  }
  return json({ success: false })
}

export { POST }
