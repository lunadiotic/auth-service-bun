import type { StatusCode } from 'hono/utils/http-status';
import { HttpError } from '../utils/http-error.js';
import type { Context, Next } from 'hono';

export const errorHandler = async (ctx: Context, next: Next) => {
	try {
		await next();
	} catch (error) {
		let statusCode: StatusCode = 500; // Default status code
		let message = 'Internal Server Error';

		if (error instanceof HttpError) {
			// Pastikan statusCode adalah tipe StatusCode
			statusCode = error.statusCode as StatusCode;
			message = error.message;
		} else if (error instanceof Error) {
			message = error.message;
		}

		console.error(`Error: ${message}`); // Log error (opsional)

		ctx.status(statusCode);
		ctx.json({
			success: false,
			message,
		});
	}
};
