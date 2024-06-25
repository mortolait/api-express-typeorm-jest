import { z } from 'zod'
import "dotenv/config"

const envSchema = z.object({
    PORT: z.coerce.number(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_HOST: z.string(),
    JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
    throw new Error("Invalid enviroment variables")
}
export const env = _env.data