const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    updateUserRole,
    getAllBookings,
    getStats
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

router.get('/bookings', getAllBookings);
router.get('/stats', getStats);

module.exports = router;
