import { CreateProductInput, Product } from "../entity/product"
import { CreateUserInput, User } from "../entity/user"

export interface ProductRepository{
    create(data: CreateProductInput): Promise<Product>
    getAll(): Promise<Product[]>
    getProductById(id:number): Promise<Product>
    update(id:number,data: Partial<Product>): Promise<Product>
}
