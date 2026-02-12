const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    getBooking,
    updateBooking,
    cancelBooking
} = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth.middleware');

// All booking routes require authentication
router.use(protect);

router.route('/')
    .get(getUserBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .put(updateBooking)
    .delete(cancelBooking);

module.exports = router;
