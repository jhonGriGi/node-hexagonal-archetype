import { z } from 'zod';

export const CreateProductCommand = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

// interface CreateProductCommand {
//     name: string;
//     description: string;
// }

export default CreateProductCommand;
