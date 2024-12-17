import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

const POST: RequestHandler = async ({ request, locals }) => {
  const userId = locals.user.id
  const { evalId, evalQuestionId, rating, textAnswer } = await request.json()

  await prisma.evalResponseDraft.update({
    where: {
      userId_evalId_evalQuestionId: { userId, evalId, evalQuestionId }
    },
    data: {
      ...(rating !== undefined && { rating }),
      ...(textAnswer !== undefined && { textAnswer }),
      updatedAt: new Date()
    }
  })

  return json({ success: true })
}

export { POST }
