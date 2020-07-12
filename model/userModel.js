const { Schema, model } = require('mongoose');

const requireString = {
    type: String,
    required: true
}

const emptyString = {
    type: String,
    default: "",
    required: false,
}

const UserSchema = new Schema({
    firstName: requireString,
    lastName: requireString,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: emptyString,
    dateOfBirth: {
        type: Date,
        default: "",
        required: false,
    },
    gender: {
        type: Boolean,
        default: null,
        required: false
    },
    password: requireString,
    confirm: {
        type: Boolean,
        default: false
    },
    avatar: emptyString,
    cart: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

module.exports = model("users", UserSchema);