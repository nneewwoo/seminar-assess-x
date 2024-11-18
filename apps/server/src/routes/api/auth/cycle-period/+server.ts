import prisma from '$lib/prisma';
import { JsonResponse } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const GET: RequestHandler = async ({ locals }) => {
	const cycle_period = await prisma.cycle_period.findFirst({ orderBy: { started_at: 'desc' } });

	return JsonResponse({ cycle_period });
};

export { GET };
