import { z } from 'zod'
import { AppDataSource } from '../data-source'
import { User } from '../entity/user'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { env } from '../env/env';

interface authenticateRequest {
    email: string,
    password: string
}

export class AuthUseCase {
    constructor() { }

    async handle({ email, password }: authenticateRequest) {
        try {
            const userRpository = AppDataSource.getRepository(User)
            const user = await userRpository.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw new Error('User not found')
            }

            const isPasswordMaches = await compare(password, user.password)
            if (!isPasswordMaches) {
                throw new Error('User not found')
            }

            const user_token = jwt.sign({
                userId: user.id, email: user.email
            }, env.JWT_SECRET, { expiresIn: '1h' })
            return {
                user_token
            }
        } catch (error) {
            throw error;
        }
    }
}