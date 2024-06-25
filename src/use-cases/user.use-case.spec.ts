import { UserUseCase } from './user.use-case';
import { UsersRepository } from '../repositories/userRepository';
import { CreateUserInput, User } from '../entity/user';

const mockUserRepository: jest.Mocked<UsersRepository> = {
    getAll: jest.fn(),
    getUserById: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
};

describe('UserUseCase', () => {
    let userUseCase: UserUseCase;

    beforeEach(() => {
        userUseCase = new UserUseCase(mockUserRepository);
    });

    describe('getAllUser', () => {
        it('should return all users', async () => {
            const users: User[] = [{ id: 1, name: 'John Doe', email: 'john@example.com', password: '123456' }];
            mockUserRepository.getAll.mockResolvedValue(users);
            const result = await userUseCase.getAllUser();

            expect(result).toEqual(users);
            expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const user: CreateUserInput = {
                name: "fulano da silva",
                email: "fulano@example.com",
                password: '123565'
            }

            const newUser: User = { id: 1, ...user }
            mockUserRepository.create.mockResolvedValue(newUser)

            const result = await userUseCase.create(newUser)
            expect(result).toEqual(newUser)

            console.log(result)
        })
    })

    describe('updateUser', () => {
        it('should update a user by id', async () => {
            const updatedUser: User = {
                id: 1,
                name: "fulano da silva",
                email: "fulano@example.com",
                password: '123565'
            }
            mockUserRepository.update.mockResolvedValue(updatedUser)

            const result = await userUseCase.update(updatedUser.id, updatedUser)
            expect(result).toEqual(updatedUser)
        }
        )
    })

    describe("getUserById",()=> {
        it("should return a user by id", async ()=> {
            const user: User = {
                id: 1,
                email: "fulano@example.com",
                name: "fulano example",
                password: '123456'
            }

            mockUserRepository.getUserById.mockResolvedValue(user)
            const result = await userUseCase.getUserById(1)
            expect(result).toEqual(user)
        })
    })
})
