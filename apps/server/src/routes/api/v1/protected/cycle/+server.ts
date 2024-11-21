import prisma from '$lib/prisma'
import { JsonResponse } from '$lib/utils'
import type { RequestHandler } from '@sveltejs/kit'

const GET: RequestHandler = async () => {
  const cycle = await prisma.cycle.findFirst({ where: { active: true } })

  return JsonResponse('OK', { cycle })
}

export { GET }
