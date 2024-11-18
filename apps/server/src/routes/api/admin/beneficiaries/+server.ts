import prisma from '$lib/prisma';
import { JsonResponse } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

const GET: RequestHandler = async () => {
	const beneficiaries = await prisma.user.findMany({
		select: {
			name: true,
			email: true,
			phone: true,
			address: true
		}
	});

	return JsonResponse({ beneficiaries });
};

export { GET };
