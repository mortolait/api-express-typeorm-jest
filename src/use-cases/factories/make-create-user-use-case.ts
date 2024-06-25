import { UserRepository } from '../../repositories/typeorm/typeorm-user-repository';
import { UserUseCase } from '../user.use-case';
import { AppDataSource } from '../../data-source';

export function makeUserUseCase() {
  if (!AppDataSource.isInitialized) {
    console.log('DataSource has not been initialized')
  }
 
  const userRepository = new UserRepository();
  const userUseCase = new UserUseCase(userRepository);
  return userUseCase;
}
