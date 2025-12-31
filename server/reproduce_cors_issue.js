
const express = require('express');
const cors = require('cors');
const http = require('http');

// Simulate the environment variable with trailing whitespace
process.env.CLIENT_URL = 'http://localhost:3000 ';

const app = express();

// Vulnerable configuration
app.use(cors({
    origin: process.env.CLIENT_URL.trim(),
    credentials: true
}));

app.get('/api/auth/signup', (req, res) => {
    res.json({ message: 'Success' });
});

const server = app.listen(0, async () => {
    const port = server.address().port;
    console.log(`Test server running on port ${port}`);

    // Make a request with the correct origin
    const options = {
        hostname: 'localhost',
        port: port,
        path: '/api/auth/signup',
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:3000' // Correct origin, no space
        }
    };

    const req = http.request(options, (res) => {
        console.log('Response Headers:', res.headers);

        if (res.headers['access-control-allow-origin']) {
            console.log('FAIL: Access-Control-Allow-Origin header is present (issue not reproduced, or CORS is too permissive?)');
        } else {
            console.log('SUCCESS: Access-Control-Allow-Origin header is MISSING (issue reproduced!)');
        }
        server.close();
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        server.close();
    });

    req.end();
});
