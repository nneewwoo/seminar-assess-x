import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

const POST: RequestHandler = async ({ request }) => {
	const { name, email, password, address, phone } = await request.json();

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password,
			address,
			phone
		}
	});

	return new Response(JSON.stringify({ message: `User created: ${user.id}` }), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};

export { POST };
