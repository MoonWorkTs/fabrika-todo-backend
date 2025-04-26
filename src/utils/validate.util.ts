import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import type { ZodSchema } from 'zod';

// Validation middleware function
export const validate =
	(schema: ZodSchema) =>
	async (req: Request, _: Response, next: NextFunction) => {
		// Validate request body
		const validation = await schema.safeParseAsync(req.body);

		// Throw error if validation fails
		if (!validation.success) {
			throw createHttpError(400, validation.error.errors[0].message);
		}

		// Pass request to next middleware
		next();
	};
