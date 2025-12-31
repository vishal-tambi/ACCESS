const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should not register user with existing email', async () => {
        await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'Password123'
        });

        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Test User 2',
                email: 'test@example.com',
                password: 'Password123'
            });

        expect(res.statusCode).toEqual(400);
    });

    it('should login valid user', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'Password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'Password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
