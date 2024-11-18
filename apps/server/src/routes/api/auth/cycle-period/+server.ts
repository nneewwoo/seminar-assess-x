import type { RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'

const GET: RequestHandler = async () => {
  const cycle_period = await prisma.cycle_period.findFirst({
    orderBy: { started_at: 'desc' }
  })

  return JsonResponse({ cycle_period })
}

export { GET }
