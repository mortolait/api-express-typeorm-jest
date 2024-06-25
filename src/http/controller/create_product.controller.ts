import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { makeProductUseCase } from "../../use-cases/factories/make-product-use-case";
import { CreateProductInput } from "../../entity/product";

const productBodySchema = z.object({
    description: z.string(),
    value: z.number(),
    code: z.string()
})

export async function createProductController(req: Request, res: Response) {
    try {
        const productUseCase = makeProductUseCase()
        const dataProduct = productBodySchema.parse(req.body) as CreateProductInput
        const createdProduct = await productUseCase.create(dataProduct)
        res.status(201).send(createdProduct)
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                issues: error.format()
            })
        }
    }
}