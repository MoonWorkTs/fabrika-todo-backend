import { z } from 'zod';

// create task schema validation
export const createTaskSchema = z.object({
	title: z
		.string({
			required_error: "Field 'title' is required"
		})
		.min(3, "Field 'title' must be at least 3 characters long")
});

// create task input type
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
