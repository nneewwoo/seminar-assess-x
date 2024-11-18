import prisma from '$lib/prisma';
import { JsonResponse } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const POST: RequestHandler = async ({ request }) => {
	const { cycle_id } = await request.json();

	const seminar = await prisma.seminar.findFirst({
		where: { cycle_id },
		orderBy: { number_of_votes: 'desc' }
	});

	return JsonResponse({ seminar });
};

export { POST };
