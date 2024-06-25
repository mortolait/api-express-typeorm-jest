import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user';
import * as dotenv from 'dotenv';
import { env } from './env/env';
import { Product } from './entity/product';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [User,Product],
  synchronize: false,
  logging: false,
  migrations: [__dirname +'/repositories/typeorm/migrations/*{.ts,.js}']
});
