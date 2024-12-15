import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import PinoPretty from 'pino-pretty';

export function logger() {
	return pinoLogger({
		pino: pino(
			{
				level: process.env.LOG_LEVEL || 'info',
			},
			process.env.APP_ENV === 'production'
				? undefined
				: PinoPretty({ colorize: true })
		),
	});
}
