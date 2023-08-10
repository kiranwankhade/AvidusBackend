const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    price: Number,
    size: { bedrooms: Number, occupancy: Number },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// propertySchema.index({ title: 'text', description: 'text', location: 'text' });

const PropertyModel = mongoose.model('detailProperty', propertySchema);


module.exports = {
    PropertyModel
}