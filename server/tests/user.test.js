const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const generateToken = require('../src/utils/generateToken');

describe('User Endpoints', () => {
    let token;
    let userId;

    beforeEach(async () => {
        const user = await User.create({
            name: 'Profile Tester',
            email: 'profile@example.com',
            password: 'Password123'
        });
        userId = user._id;
        token = generateToken(userId);
    });

    it('should update user profile with new fields', async () => {
        const res = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Name',
                bio: 'I am a tester',
                phone: '1234567890',
                jobTitle: 'QA Engineer'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated Name');
        expect(res.body).toHaveProperty('bio', 'I am a tester');
        expect(res.body).toHaveProperty('phone', '1234567890');
        expect(res.body).toHaveProperty('jobTitle', 'QA Engineer');
    });

    it('should not update profile if not authenticated', async () => {
        const res = await request(app)
            .put('/api/users/profile')
            .send({
                name: 'Hacker'
            });

        expect(res.statusCode).toEqual(401);
    });

    it('should allow admin to get user by id', async () => {
        // Create an admin user first
        const admin = await User.create({
            name: 'Admin Tester',
            email: 'admin.test@example.com',
            password: 'Password123',
            role: 'admin'
        });
        const adminToken = generateToken(admin._id);

        const res = await request(app)
            .get(`/api/users/${userId}`) // userId from beforeEach
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Profile Tester');
        expect(res.body).toHaveProperty('email', 'profile@example.com');
    });
});
