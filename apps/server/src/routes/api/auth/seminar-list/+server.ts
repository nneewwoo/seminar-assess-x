import prisma from '$lib/prisma';
import { JsonResponse } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const POST: RequestHandler = async ({ request, locals }) => {
	const { cycle_id } = await request.json();

	const seminar_list = await prisma.seminar.findMany({ where: { cycle_id } });

	return JsonResponse({ seminar_list });
};

export { POST };
