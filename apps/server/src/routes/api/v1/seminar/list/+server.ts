import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

const GET: RequestHandler = async ({ locals }) => {
  const userId = locals.user.id

  const seminars = await prisma.seminar.findMany({
    where: { cycle: { active: true } },
    include: {
      votes: {
        where: {
          userId
        }
      },
      _count: {
        select: {
          votes: true
        }
      }
    }
  })

  if (seminars) {
    const seminarsWithUserVote = seminars.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      course: s.course,
      votedByUser: s.votes.length > 0,
      numberOfVotes: s._count.votes
    }))

    return json({ success: true, body: { seminars: seminarsWithUserVote } })
  }
  return json({ success: false, body: { error: 'unknown' } })
}

export { GET }
