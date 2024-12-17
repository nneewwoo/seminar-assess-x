import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params

  const questions = await prisma.evalQuestion.findMany({
    where: {
      evalId: id
    }
  })

  if (questions) {
    return json({ success: true, body: { questions } })
  }
  return json({ success: false, body: { error: 'unknown' } })
}
