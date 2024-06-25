import { AuthUseCase } from './auth.use-case';
import { User } from '../entity/user';
import { AppDataSource } from '../data-source';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../env/env';

jest.mock('../data-source');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockUserRepository = {
  findOne: jest.fn()
};

(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockUserRepository);

describe('AuthUseCase', () => {
  let authUseCase: AuthUseCase;

  beforeEach(() => {
    authUseCase = new AuthUseCase();
  });

  it('should authenticate user and return token', async () => {
    const user: User = { id: 1, email: 'fulano@example.com', name: 'Fulano Example', password: 'hashed_password' };
    mockUserRepository.findOne.mockResolvedValue(user);
    (compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token');

    const result = await authUseCase.handle({ email: 'fulano@example.com', password: '123456' });

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: 'fulano@example.com' } });
    expect(compare).toHaveBeenCalledWith('123456', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 1, email: 'fulano@example.com' }, env.JWT_SECRET, { expiresIn: '1h' });
    expect(result).toEqual({ user_token: 'token' });
  });

  it('should throw an error if user not found', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(authUseCase.handle({ email: 'fulano@example.com', password: '123456' })).rejects.toThrow('User not found');
  });

  it('should throw an error if password does not match', async () => {
    const user: User = { id: 1, email: 'fulano@example.com', name: 'Fulano Example', password: 'hashed_password' };
    mockUserRepository.findOne.mockResolvedValue(user);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(authUseCase.handle({ email: 'fulano@example.com', password: '123456' })).rejects.toThrow('User not found');
  });
});
