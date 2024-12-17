import { json, type RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'

const POST: RequestHandler = async ({ request }) => {
  const { cycleId } = await request.json()

  const current = await prisma.cyclePeriod.findFirst({ where: { cycleId } })
  if (current) {
    return json({ success: true, body: { period: current.currentPeriod } })
  }
  return json({ success: false, body: { error: 'unknown' } })
}

export { POST }
