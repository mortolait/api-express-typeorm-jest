import { Response, Request } from "express";
import { ZodError, z } from 'zod'
import { makeUserUseCase } from "../../use-cases/factories/make-create-user-use-case";


export async function getUserController(req: Request, res: Response) {
    try {
        const userUseCase = makeUserUseCase()
        const users = await userUseCase.getAllUser()
        res.status(201).json(users)
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