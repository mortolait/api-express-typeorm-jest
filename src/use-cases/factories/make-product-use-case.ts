import { TypeOrmProductRepository } from '../../repositories/typeorm/typeorm-product-repository';
import { AppDataSource } from '../../data-source';
import { ProductUseCase } from '../product-use-case';

export function makeProductUseCase() {
  if (!AppDataSource.isInitialized) {
    console.log('DataSource has not been initialized')
  }
  const productRepository = new TypeOrmProductRepository();
  const userUseCase = new ProductUseCase(productRepository);
  return userUseCase;
}
