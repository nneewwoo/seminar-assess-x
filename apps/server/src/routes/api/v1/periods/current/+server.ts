import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async () => {
  console.log('here')
  const current = await prisma.cyclePeriod.findFirst({
    orderBy: { startedAt: 'desc' }
  })
  if (current) {
    return json({ success: true, body: { period: current.currentPeriod } })
  }
  return json({ success: false, body: { error: 'unknown' } })
}
