import { HttpError } from '../utils/http-error.js';

export const notFoundHandler = () => {
	throw new HttpError(404, 'Route not found');
};
