import dotenv from 'dotenv';
import express from 'express';
import type { Application, NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';

import taskController from '~modules/task/task.controller';

import type { General } from '~types/general';

function main() {
	// Load environment variables
	dotenv.config();
	const port = process.env.APP_PORT || 8081;

	// Create express app
	const app: Application = express();
	app.use(express.json());

	// Setup routes
	app.use('/tasks', taskController);

	// Error handling routes not found
	app.all(/(.*)/, (_, res: Response<General.Error>) => {
		res.status(404).json({
			statusCode: 404,
			status: 'NotFound',
			message: 'Route not found'
		});
	});

	// Error handling
	app.use((err: HttpError, _: Request, res: Response<General.Error>) => {
		console.log(err);
		res.status(err.statusCode).json({
			statusCode: err.statusCode,
			status: err.name,
			message: err.message
		});
	});

	// Start server
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
}

main();
