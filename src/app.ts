import { OpenAPIHono } from '@hono/zod-openapi';
import { errorHandler } from './middlewares/error-handler.js';
import { notFoundHandler } from './middlewares/not-found.js';
import { logger } from './middlewares/pino-logger.js';
import type { PinoLogger } from 'hono-pino';
import { expand } from 'dotenv-expand';
import { config } from 'dotenv';

expand(config());

interface AppBindings {
	Variables: {
		logger: PinoLogger;
	};
}

const app = new OpenAPIHono();
app.use(logger());

// Global Error Handler
app.use('*', errorHandler);

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.get('/error', (c) => {
	c.var.logger.debug('Test');
	throw new Error('Test Error');
});

// Not Found Handler
app.all('*', notFoundHandler);

// Add a 404 handler
app.notFound((c) => {
	c.status(404);
	return c.json({
		errors: true,
		message: 'Endpoint not found',
	});
});

// Add a default error handler
app.onError((err, c) => {
	console.error(`${err}`);
	c.status = c.status || 500;
	err.message = err.message || 'Internal Server Error';
	return c.json({
		errors: true,
		message: err.message,
	});
});

export default app;
