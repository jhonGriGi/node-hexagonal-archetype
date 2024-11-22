import { z } from 'zod';

export const UpdateProductCommand = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
});

// interface UpdateProductCommand {
//     id: string;
//     name: string;
//     description: string;
// }

export default UpdateProductCommand;
