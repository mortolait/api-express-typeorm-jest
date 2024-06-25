import { UsersRepository }  from "../repositories/userRepository";
import { CreateUserInput, User } from '../entity/user'

export class UserUseCase{
    constructor(private userRepository: UsersRepository){}

    async getAllUser(): Promise<User[]>{
       const users = await this.userRepository.getAll()
       return users
    }
    async getUserById(id: number): Promise<User>{
        return await this.userRepository.getUserById(id)
    }
    async create(user: CreateUserInput): Promise<Partial<User>>{
        try {
            const createdUser =  await this.userRepository.create(user)
            const { password: _, ...userWithoutPassword } = createdUser;
            return userWithoutPassword
        } catch (error) {
            console.log(error)
        }
    }
    async update(id:number,user: Partial<User>){
        const updatedUser =  await this.userRepository.update(id,user)
        const { password: _,...userWithoutPassword} = updatedUser
        return userWithoutPassword
    }
}