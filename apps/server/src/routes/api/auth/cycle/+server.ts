import type { RequestHandler } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'

const GET: RequestHandler = async () => {
  const cycle = await prisma.cycle.findFirst({ where: { active: true } })

  return JsonResponse({ cycle })
}

export { GET }
