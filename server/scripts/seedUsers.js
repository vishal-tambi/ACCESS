const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = [];
        for (let i = 1; i <= 20; i++) {
            users.push({
                name: `Demo User ${i}`,
                email: `user${i}@example.com`,
                password: 'Password123#',
                role: 'user',
                status: i % 4 === 0 ? 'inactive' : 'active', // 25% inactive
                bio: `This is a bio for Demo User ${i}.`,
                jobTitle: `Software Engineer ${i}`,
                phone: `555-010${i < 10 ? '0' + i : i}`
            });
        }

        // Check if users already exist to avoid duplicates if run multiple times
        // For simplicity, we'll try to insert and catch duplicate errors, or just clear non-admins first.
        // Let's just create and ignore duplicates logs

        let createdCount = 0;
        for (const user of users) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                await User.create(user);
                createdCount++;
            }
        }

        console.log(`${createdCount} demo users created successfully`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();
