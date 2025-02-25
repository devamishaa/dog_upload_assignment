const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
    name : { type: String, required: true },
    imageUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dog', DogSchema);
