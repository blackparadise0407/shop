const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageCollection: [String],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
})

const ImageModel = mongoose.model('images', ImageSchema);

module.exports = ImageModel;