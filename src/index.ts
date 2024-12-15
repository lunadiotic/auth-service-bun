import { serve } from '@hono/node-server';
import app from './app.js';

const port = Number(process.env.APP_PORT) || 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
