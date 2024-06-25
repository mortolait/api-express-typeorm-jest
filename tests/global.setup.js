
const { DataSource } = require('typeorm');
const { User } = require('../src/entity/user');
const dotenv = require('dotenv');
const { Client } = require('pg');
dotenv.config();
async function createTestDatabase() {
    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
    });

    await client.connect();
    await client.query('DROP DATABASE IF EXISTS testdb2');
    await client.query('CREATE DATABASE testdb2');
    await client.end();
}

module.exports = async () => {
    await createTestDatabase()
    global.testDataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'testdb2',
        entities: [User],
        synchronize: true,
        logging: false,
    });

    await global.testDataSource.initialize();
};
