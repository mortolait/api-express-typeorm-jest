import { CreateProductInput, Product } from "../entity/product"
import { User } from "../entity/user"
import { ProductRepository } from "../repositories/productRepository"
import { ProductUseCase } from "./product-use-case"

const mockProductRepository: jest.Mocked<ProductRepository> = {
    create: jest.fn(),
    getAll:jest.fn(),
    getProductById:jest.fn(),
    update: jest.fn()
}

describe("productUseCase", ()=> {
    let productUseCase: ProductUseCase

    beforeEach(()=>{
        productUseCase = new ProductUseCase(mockProductRepository);

    })

    describe("createProduct", ()=> {
        it("should create a new product", async ()=> {
            const product: CreateProductInput = {
                description: "product 1",
                value: 10,
                code: "123456"
            }

            const newProduct: Product = {id:1, ...product}
            console.log({ newProduct })
            mockProductRepository.create.mockResolvedValue(newProduct)
            const result = await productUseCase.create(newProduct)

            expect(result).toEqual(newProduct)
        })

        it("should return users", async ()=> {
            const products: Product[] = [{id: 1, description: "product 1", code: "12345",value: 10}]
            mockProductRepository.getAll.mockResolvedValue(products)
            const result = await productUseCase.getAll()
            expect(result).toEqual(products)
        })

        it("should return a product by id", async ()=> {
            const createdProduct: Product = {id: 1,description: "product 1",code: "123654", value: 10} 
            mockProductRepository.getProductById.mockResolvedValue(createdProduct)
            const result = await productUseCase.getProductById(1)
            expect(result).toEqual(createdProduct)
        })

        it("should update a product", async ()=>{
            const updatedProduct: Product = {id: 1,description: "product 1",code: "123654", value: 10} 
            mockProductRepository.update.mockResolvedValue(updatedProduct)
            const result = await productUseCase.update(updatedProduct.id,updatedProduct)
            expect(result).toEqual(updatedProduct)
        })
    })
})