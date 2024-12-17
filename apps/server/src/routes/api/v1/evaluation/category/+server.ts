import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

const GET: RequestHandler = async () => {
  const categories = await prisma.eval.findMany({ include: { _count: true } })

  if (categories) {
    return json({
      success: true,
      body: {
        categories
      }
    })
  }
  return json({ success: false, body: { error: 'unknown' } })
}

export { GET }
