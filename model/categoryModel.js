const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    catID: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
})

module.exports = mongoose.model("Categories", CategorySchema);