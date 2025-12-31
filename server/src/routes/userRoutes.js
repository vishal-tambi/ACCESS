const express = require('express');
const {
    getUsers,
    getUserById,
    updateUserStatus,
    updateUserProfile,
    changePassword,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const cache = require('../middleware/cacheMiddleware');

// Admin routes
router.get('/', protect, authorize('admin'), cache, getUsers);
router.get('/:id', protect, authorize('admin'), getUserById);
router.patch('/:id', protect, authorize('admin'), updateUserStatus);

// User Profile routes
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, changePassword);

module.exports = router;
