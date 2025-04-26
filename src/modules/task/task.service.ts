import { Task } from '@prisma/client';
import createHttpError from 'http-errors';

import { db } from '~core/db';

import { CreateTaskInput } from './task.input';

export class TaskService {
	// Creating a new task
	async createTask(input: CreateTaskInput): Promise<Task> {
		return await db.task.create({ data: { title: input.title } });
	}

	// Getting all tasks
	async getTasks(): Promise<Task[]> {
		return await db.task.findMany();
	}

	// Updating a task
	async toggleCompleted(id: string): Promise<Task> {
		// Check if task exists
		const task = await db.task.findUnique({ where: { id } });

		if (!task) {
			throw createHttpError(404, 'Task not found');
		}

		return await db.task.update({
			where: { id },
			data: { completed: !task.completed }
		});
	}
}
