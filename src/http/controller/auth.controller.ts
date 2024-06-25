import { Response, Request } from "express";
import { ZodError, z } from 'zod'
import { AuthUseCase } from "../../use-cases/auth.use-case"

const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

interface userAuthenticate{
    email: string,
    password: string
}
export type userSchemaType = z.infer<typeof userSchema>

export async function authUserController(req: Request, res: Response) {
    try {
        const userData = userSchema.parse(req.body) as userAuthenticate
        const authUseCase = new AuthUseCase()
        const  {user_token } = await authUseCase.handle(userData)
        res.status(201).json(user_token)
    } catch (error) {
        console.log({ error })
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                issues: error.format()
            })
        }
        res.status(500).json({ message: 'Internal server Error' })
    }
}