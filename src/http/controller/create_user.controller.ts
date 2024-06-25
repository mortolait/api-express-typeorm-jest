import { Response, Request } from "express";
import { ZodError, z } from 'zod'
import { makeUserUseCase } from "../../use-cases/factories/make-create-user-use-case";
import { CreateUserInput } from "../../entity/user";
import { hash } from "bcrypt";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});


export async function createUserController(req: Request, res: Response) {
    try {
        const userData = userSchema.parse(req.body) as CreateUserInput
        const createUserUseCase = makeUserUseCase()
        userData.password = await hash(userData.password,6)
        const createdUser = await createUserUseCase.create(userData)
        res.status(201).json(createdUser)
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