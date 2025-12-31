const redisClient = require('../config/redis');

const cache = async (req, res, next) => {
    try {
        const key = req.originalUrl;
        const cachedResponse = await redisClient.get(key);

        if (cachedResponse) {
            console.log(`Cache hit for ${key}`);
            return res.status(200).json(JSON.parse(cachedResponse));
        } else {
            console.log(`Cache miss for ${key}`);
            // Intercept res.json to store the response in cache
            const originalJson = res.json;
            res.json = (body) => {
                redisClient.set(key, JSON.stringify(body), {
                    EX: 3600 // Cache for 1 hour
                });
                return originalJson.call(res, body);
            };
            next();
        }
    } catch (error) {
        console.error("Redis Cache Error:", error);
        next(); // Proceed without cache if redis fails
    }
};

const clearCache = async (keyPattern) => {
    try {
        // Simple implementation: clear specific key or flush all if needed.
        // For this use case, we might want to clear list cache when a user is updated.
        // This is a basic implementation.
        // redisClient.del(keyPattern);
    } catch (err) {
        console.error("Redis Clear Error", err);
    }
}

module.exports = cache;
