import { z } from 'zod'

const user = z.object({
  username: z.string()
})

user.parse({ username: 'darwin' })

type User = z.infer<typeof user>
