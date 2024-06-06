const mongoose = require('mongoose');

const review = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    email: String,
    name: String,
    website: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});
const download = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    downloadedAt: Number
})
const view = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    viewedAt: Number
})
const metaData = new mongoose.Schema({
    description: String,
    categories: [String],
    tags: [String],
    filters: {
        type: {
            age: String,
            people: String,
            location: String,
            gesture: String,
            outfit: String,
            advertisement: String
        }
    }
});
const path = new mongoose.Schema({
    demo: String,
    original: String,
});
const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    metaData: {
        type: metaData,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: {
            USD: Number,
            INR: Number,
            EURO: Number,
        },
        required: true,
    },
    path: {
        type: path,
        required: true,
    },
    review: {
        type: [review],
        required: true,
    },
    downloads: {
        type: [download]
    },
    views: {
        type: [view]
    },
});

module.exports = mongoose.model('Asset', assetSchema);