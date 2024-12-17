import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

const GET: RequestHandler = async ({ locals }) => {
  const userId = locals.user.id

  const userVoted = await prisma.vote.findFirst({
    where: {
      userId,
      cycle: { active: true }
    }
  })

  return json({ success: true, body: { voted: userVoted ? true : false } })
}

export { GET }
