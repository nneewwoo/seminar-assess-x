import prisma from '$lib/prisma';
import { JsonResponse } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const POST: RequestHandler = async ({ request }) => {
	const { cycle_id, title, course } = await request.json();
	const seminar = await prisma.seminar.create({
		data: {
			course,
			cycle_id,
			title
		}
	});

	return JsonResponse({ message: `Seminar added: ${seminar.id}` });
};

export { POST };
