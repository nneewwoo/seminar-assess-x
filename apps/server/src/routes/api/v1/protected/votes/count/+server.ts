import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import type { RequestHandler } from '@sveltejs/kit'

const GET: RequestHandler = async () => {
  const cycle_period = await prisma.cycle_period.findFirst({
    orderBy: { started_at: 'desc' }
  })
  const total_votes = await prisma.votes.count({
    where: { cycle_id: cycle_period?.cycle_id }
  })

  return JsonResponse('OK', { total_votes })
}

export { GET }
