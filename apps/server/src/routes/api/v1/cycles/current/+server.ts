import { json } from '@sveltejs/kit'
import prisma from '$lib/prisma'

export const GET = async () => {
  const current = await prisma.cycle.findFirst({ where: { active: true } })
  if (current) {
    return json({ success: true, body: { cycleId: current.id } })
  }
  return json({ success: false, body: { error: 'unknown' } })
}
