const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    propertyId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = {
    BookingModel
}

