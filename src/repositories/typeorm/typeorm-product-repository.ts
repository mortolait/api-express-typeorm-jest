import { Repository } from "typeorm";
import { CreateUserInput, User } from "../../entity/user";
import { AppDataSource } from "../../data-source";
import { ProductRepository } from "../productRepository";
import { CreateProductInput, Product } from "../../entity/product";

export class TypeOrmProductRepository implements ProductRepository{
    private repository: Repository<Product>

    constructor() {
        this.repository = AppDataSource.getRepository(Product)
    }

    async getAll() {
        return this.repository.find();
    }

    async getProductById(id: number) {
        return this.repository.findOneBy({ id })
    }

    async create(product: CreateProductInput): Promise<Product> {
        return this.repository.save(product)
    }
    async update(id: number, product: Partial<Product>): Promise<Product | undefined> {
        await this.repository.update(id, product);
        return this.repository.findOneBy({ id });
    }
}
