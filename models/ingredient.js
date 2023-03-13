const mongoose = require('mongoose')

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    qty: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        lowercase: true
    }
}, { _id: false})

//module.exports = mongoose.model('ingredients', ingredientSchema)