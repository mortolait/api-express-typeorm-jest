import { CreateUserInput, User } from "../entity/user"

export interface UsersRepository{
    create(data: CreateUserInput): Promise<User>
    getAll(): Promise<User[]>
    getUserById(id:number): Promise<User>
    update(id:number,data: Partial<User>): Promise<User>
}
