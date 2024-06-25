import { DataSource } from 'typeorm';
import { User } from '../src/entity/user';
import dotenv from 'dotenv';
dotenv.config();

beforeAll(async () => {
  const dataSource = global.testDataSource as DataSource;
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
});

afterAll(async () => {
  const dataSource = global.testDataSource as DataSource;
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
});

afterEach(async () => {
  const dataSource = global.testDataSource as DataSource;
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE`);
  }
});
