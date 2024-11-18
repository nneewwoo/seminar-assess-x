import prisma from '$lib/prisma';
import { JsonResponse } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const POST: RequestHandler = async ({ request }) => {
	const { seminar_id } = await request.json();
	const exams = await prisma.question.findMany({
		where: { seminar_id },
		select: { options: true }
	});

	return JsonResponse({ exams });
};

export { POST };
