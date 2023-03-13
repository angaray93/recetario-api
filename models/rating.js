const mongoose = require('mongoose')
const  ObjectID = require('mongodb').ObjectId;

const ratingSchema = mongoose.Schema({
    userId: {
        type: ObjectID,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: v => v >= 0 && v<=5,
            message: "rating debe estar entre 0 y 5"
        }
    },
}, { _id: false})
