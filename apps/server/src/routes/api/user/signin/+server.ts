import prisma from '$lib/prisma';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JsonResponse } from '$lib/utils';

const POST: RequestHandler = async ({ request, locals }) => {
	const { email, password } = await request.json();

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) throw error(401, 'Invalid email or password');

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) throw error(401, 'Invalid email or password');

	const token = jwt.sign({ id: user.id, email: user.email }, locals.jwt_secret, {
		expiresIn: '72h'
	});

	return JsonResponse({ token });
};

export { POST };
