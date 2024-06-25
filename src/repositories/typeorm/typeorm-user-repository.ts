import { Repository } from "typeorm";
import { CreateUserInput, User } from "../../entity/user";
import { AppDataSource } from "../../data-source";
import { UsersRepository } from "../userRepository";

export class UserRepository implements UsersRepository{
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async getAll() {
        return this.repository.find();
    }

    async getUserById(id: number) {
        return this.repository.findOneBy({ id })
    }

    async create(user: CreateUserInput): Promise<User> {
        return this.repository.save(user)
    }
    async update(id: number, user: Partial<User>): Promise<User | undefined> {
        await this.repository.update(id, user);
        return this.repository.findOneBy({ id });
    }
}

export default new UserRepository()