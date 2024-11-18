import { error, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.jwt_secret = process.env.JWT_SECRET as string;

	const { pathname } = event.url;

	// if (pathname.startsWith('/api/auth')) {
	// 	const token = event.request.headers.get('Authorization')?.replace('Bearer ', '');

	// 	if (!token) throw error(401, 'Unauthorized: Missing token');

	// 	try {
	// 		const decoded = jwt.verify(token, event.locals.jwt_secret) as { id: string; email: string };
	// 		event.locals.user = decoded;
	// 	} catch (_error) {
	// 		throw error(401, 'Unauthorized: Invalid or expired token');
	// 	}
	// }

	return await resolve(event);
};
