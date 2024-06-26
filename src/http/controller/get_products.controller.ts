import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { makeProductUseCase } from "../../use-cases/factories/make-product-use-case";
import { CreateProductInput } from "../../entity/product";

export async function getProductController(req: Request, res: Response) {
    try {
        const productUseCase = makeProductUseCase()
        const products = await productUseCase.getAll()
        res.status(201).send(products)
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                issues: error.format()
            })
        }
    }
}