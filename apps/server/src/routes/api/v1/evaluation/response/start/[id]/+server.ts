import { json, type RequestHandler } from '@sveltejs/kit'
import type { User } from '@prisma/client'
import prisma from '$lib/prisma'

const POST: RequestHandler = async ({ request, params, locals }) => {
  const { id } = params
  const { cycleId } = await request.json()

  const { id: userId } = locals.user as User

  const evalId = id as string

  const category = await prisma.eval.findUnique({
    where: {
      id: evalId
    },
    include: {
      questions: true
    }
  })

  if (!category) {
    return json({
      success: false,
      body: { error: 'Category with given ID not found' }
    })
  }

  const existingDrafts = await prisma.evalResponseDraft.findMany({
    where: {
      userId,
      evalId
    },
    include: {
      evalQuestion: true
    }
  })

  if (existingDrafts.length === category.questions.length) {
    return json({ success: true, body: { questions: existingDrafts } })
  }

  const newDrafts = category.questions.map((q) => ({
    userId,
    evalId,
    evalQuestionId: q.id,
    cycleId
  }))

  await prisma.evalResponseDraft.createMany({
    data: newDrafts,
    skipDuplicates: true
  })

  const questions = await prisma.evalResponseDraft.findMany({
    where: {
      userId,
      evalId
    },
    include: {
      evalQuestion: true
    }
  })

  if (questions) {
    return json({ success: true, body: { questions } })
  }

  return json({ success: false, body: { error: 'unknown' } })
}

export { POST }
