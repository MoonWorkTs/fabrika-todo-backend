import { Task } from '@prisma/client';
import { Request, Response, Router } from 'express';

import { validate } from '~utils/validate.util';

import { CreateTaskInput, createTaskSchema } from './task.input';
import { TaskService } from './task.service';

class TaskController {
	// Initializing the routes
	public router: Router = Router();
	// Initializing the task service
	private readonly taskService: TaskService = new TaskService();

	constructor() {
		// Initializing the routes
		this.initializeRoutes();
	}

	// Initializing the routes
	private initializeRoutes() {
		// Creating a new task
		this.router.post(
			'/',
			validate(createTaskSchema),
			async (req: Request<any, any, CreateTaskInput>, res: Response<Task>) => {
				const result = await this.taskService.createTask(req.body);

				res.status(201).json(result);
			}
		);

		// Getting all tasks
		this.router.get('/', async (_, res: Response<Task[]>) => {
			const result = await this.taskService.getTasks();
			res.status(200).json(result);
		});

		// Updating a task
		this.router.patch(
			'/:id',
			async (req: Request<{ id: string }>, res: Response<Task>) => {
				const result = await this.taskService.toggleCompleted(req.params.id);
				res.status(200).json(result);
			}
		);
	}
}

export default new TaskController().router;
