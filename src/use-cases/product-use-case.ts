
import { CreateProductInput, Product } from '../entity/product'
import { ProductRepository } from "../repositories/productRepository";

export class ProductUseCase{
    constructor(private productRepository:  ProductRepository){}

    async getAllUser(): Promise<Product[]>{
       const products = await this.productRepository.getAll()
       return products
    }
    async getUserById(id: number): Promise<Product>{
        return await this.productRepository.getProductById(id)
    }
    async create(product: CreateProductInput): Promise<Partial<Product>>{
        try {
            const createdProduct =  await this.productRepository.create(product)
            return createdProduct
        } catch (error) {
            console.log(error)
        }
    }
    async update(id:number,product: Partial<Product>){
        const updatedProduct =  await this.productRepository.update(id,product)
        return updatedProduct
    }
}