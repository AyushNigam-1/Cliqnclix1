const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    downloads: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Asset'
    },
    cart: {
        type: [{
            asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
            size: String,
            format: String,
            currency: String,
            quantity: Number
        }],
        required: false,
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Asset',
        required: false,
    },
    assets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Asset',
        required: false,
    },
});
userSchema.methods.toSafeObject = function () {
    return { ...this.toObject(), password: undefined };
};
module.exports = mongoose.model('User', userSchema);