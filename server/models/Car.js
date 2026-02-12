const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Please provide car brand'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Please provide car model'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please provide car category'],
        enum: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Sports', 'Electric', 'Van'],
        default: 'Sedan'
    },
    year: {
        type: Number,
        required: [true, 'Please provide manufacturing year'],
        min: [2000, 'Year must be 2000 or later'],
        max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Please provide rental price per day'],
        min: [0, 'Price cannot be negative']
    },
    features: {
        type: [String],
        default: []
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        default: 'Petrol'
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        default: 'Manual'
    },
    seats: {
        type: Number,
        required: [true, 'Please provide number of seats'],
        min: [2, 'Minimum 2 seats required'],
        max: [12, 'Maximum 12 seats allowed']
    },
    availability: {
        type: Boolean,
        default: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        fileId: {
            type: String,
            required: true
        }
    }],
    location: {
        type: String,
        required: [true, 'Please provide car location'],
        trim: true
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for search optimization
carSchema.index({ brand: 'text', model: 'text', category: 'text' });

module.exports = mongoose.model('Car', carSchema);
