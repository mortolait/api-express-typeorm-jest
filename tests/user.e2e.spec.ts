import request from 'supertest';
import app from '../src/app';
import { DataSource } from 'typeorm';
import { CreateUserInput } from '../src/entity/user';
import { AppDataSource } from '../src/data-source'; 

let connection: DataSource;

beforeAll(async () => {
  connection = await AppDataSource.initialize()
});

afterAll(async () => {
  await AppDataSource.destroy(); 
});

describe('User Endpoints', () => {
  it('should create a new user and return 201', async () => {
    const userData: CreateUserInput = {
      name: 'Fulano da Silva',
      email: 'fulano@example.com',
      password: '123456',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
    expect(response.body).not.toHaveProperty('password');
  });

  it('should find all users and return 200', async ()=> {
    const usersData: CreateUserInput[] = [
      { name: 'User One', email: 'userone@example.com', password: 'password1' },
      { name: 'User Two', email: 'usertwo@example.com', password: 'password2' }
    ];

    for (const userData of usersData) {
      await request(app)
        .post('/users')
        .send(userData)
        .expect(201);
    }
    
    const response = await request(app)
      .get("/users")
    const users = response.body;
    users.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  })

  it("should update a user for id and return 200",async ()=> {
    const response = await request(app).put('/users/1')
      .send({name: "updatedname", email: "updatedemail@teste.com"})
      .expect(200)

      console.log({ response: response.body })
      expect(response.body.name).toBe("updatedname")
  })
});
