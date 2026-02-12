const Booking = require('../models/Booking');
const Car = require('../models/Car');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const { car, pickupLocation, pickupDate, returnDate, notes } = req.body;

        // Check if car exists and is available
        const carDoc = await Car.findById(car);

        if (!carDoc) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        if (!carDoc.availability) {
            return res.status(400).json({
                success: false,
                message: 'Car is not available for booking'
            });
        }

        // Calculate total price based on rental duration
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
        const totalPrice = days * carDoc.pricePerDay;

        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            car: car,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                {
                    pickupDate: { $lte: returnD },
                    returnDate: { $gte: pickup }
                }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({
                success: false,
                message: 'Car is already booked for the selected dates'
            });
        }

        // Create booking
        const booking = await Booking.create({
            user: req.user.id,
            car,
            pickupLocation,
            pickupDate,
            returnDate,
            totalPrice,
            notes
        });

        // Update car availability
        await Car.findByIdAndUpdate(car, { availability: false });

        // Populate user and car details
        await booking.populate('user', 'name email phone');
        await booking.populate('car', 'brand model category pricePerDay images');

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ... (existing code for getUserBookings, getBooking, updateBooking matches context, I will skip re-writing them in replace block if I can target specific chunks, but replace_file_content targets contiguous blocks. I'll split into two replace blocks if possible or just one big file update if they are close? No, they are far apart.)

// Actually, I'll use multi_replace for separate chunks.


// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('car', 'brand model category pricePerDay images location')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('car', 'brand model category pricePerDay images location');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Make sure user is booking owner or admin
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Make sure user is booking owner or admin
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this booking'
            });
        }

        // Update booking
        booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('car', 'brand model category pricePerDay images');

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Make sure user is booking owner or admin
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        // Update booking status to cancelled
        booking.status = 'cancelled';
        await booking.save();

        // Update car availability
        await Car.findByIdAndUpdate(booking.car, { availability: true });

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
