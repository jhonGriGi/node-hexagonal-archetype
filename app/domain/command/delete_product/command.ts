import { z } from 'zod';

export const DeleteProductCommand = z.object({
    id: z.string().min(1),
});

// interface DeleteProductCommand {
//     id: string;
// }

export default DeleteProductCommand;
