import request from "supertest";
import app from '../src/app'
import { DataSource } from "typeorm";
import { AppDataSource } from "../src/data-source";
import { CreateProductInput } from "../src/entity/product";
import exp from "constants";

let connection: DataSource

beforeAll(async () => {
    connection = await AppDataSource.initialize()
})

afterAll(async () => {
    await AppDataSource.destroy()
})

describe('Products Endpoints', () => {
    it("should create a new product and return 201", async () => {
        const userData: CreateProductInput = {
            description: "product1",
            code: "123456",
            value: 20
        }

        const response = await request(app)
            .post('/product')
            .send(userData)
            .expect(201)

        expect(response.body).toHaveProperty('id');
        expect(response.body.description).toBe(userData.description)
        expect(response.body.code).toBe(userData.code)
        expect(response.body.value).toBe(userData.value)
    })

    it("should return all products", async () => {
        const products: CreateProductInput[] = [
            {
                description: "product9",
                code: "123456",
                value: 20
            },
            {
                description: "product10",
                code: "123456",
                value: 20
            }
        ]

        for (const product of products) {
            await request(app)
                .post('/product')
                .send(product)
        }

        const response = await request(app).get("/product")
        const createdproducts = response.body

        for (const product of createdproducts) {
            expect(product).toHaveProperty('id')
            expect(product).toHaveProperty('description')
            expect(product).toHaveProperty('value')
            expect(product).toHaveProperty('code')
        }

    })
})