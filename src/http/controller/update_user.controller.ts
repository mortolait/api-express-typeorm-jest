import { Response, Request } from "express";
import { ZodError, number, z } from 'zod'
import { makeUserUseCase } from "../../use-cases/factories/make-create-user-use-case";
import { CreateUserInput } from "../../entity/user";
import { hash } from "bcrypt";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email()
});

const userParamSchema = z.object({
    id: z.coerce.number()
})
export async function updateUserController(req: Request, res: Response) {
    try {
        const userData = userSchema.parse(req.body) 
        const { id } = userParamSchema.parse(req.params)
        const createUserUseCase = makeUserUseCase()
        const updatedUser = await createUserUseCase.update(id,userData)
        res.status(200).json(updatedUser)
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