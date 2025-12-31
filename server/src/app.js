const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: (process.env.CLIENT_URL || '*').trim(), // Allow specific origin in production, trimmed to remove invisible spaces
    credentials: true,
}));

console.log('CORS Origin Configured:', (process.env.CLIENT_URL || '*').trim());
app.use(helmet());
app.use(morgan('dev'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'User Management System API is running' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Server Error', error: err.message });
});

module.exports = app;
