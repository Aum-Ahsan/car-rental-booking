const express = require('express');
const router = express.Router();
const {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
    getCategories
} = require('../controllers/car.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getCars);
router.get('/categories/all', getCategories);
router.get('/:id', getCar);

// Admin only routes
router.post('/', protect, authorize('admin'), createCar);
router.put('/:id', protect, authorize('admin'), updateCar);
router.delete('/:id', protect, authorize('admin'), deleteCar);

module.exports = router;
