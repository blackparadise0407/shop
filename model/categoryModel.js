const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const CategorySchema = new mongoose.Schema({
    catID: {
        type: Number,
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
CategorySchema.plugin(autoIncrement, { id: 'cat_secq', inc_field: 'catID' });
module.exports = mongoose.model("categories", CategorySchema);