const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  pickupLocation: {
    type: String,
    required: [true, 'Please provide pickup location'],
    trim: true
  },
  pickupDate: {
    type: Date,
    required: [true, 'Please provide pickup date'],
    validate: {
      validator: function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
      },
      message: 'Pickup date cannot be in the past'
    }
  },
  returnDate: {
    type: Date,
    required: [true, 'Please provide return date'],
    validate: {
      validator: function (value) {
        // Simple check if return date is after pickup date
        // Note: 'this.pickupDate' is available on document creation
        return !this.pickupDate || value >= this.pickupDate;
      },
      message: 'Return date must be equal to or after pickup date'
    }
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
