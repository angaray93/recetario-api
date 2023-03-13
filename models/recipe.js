const mongoose = require('mongoose')
const  ObjectID = require('mongodb').ObjectId
const ingredientSchema = require('./ingredient')
const ratingSchema = require('./rating')

const recipeSchema = mongoose.Schema({
    schema: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectID,
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    ingredients: {
        type: [ingredientSchema],
        validate: {
            validator: v => v.length > 0,
            message: "Sin ingredientes"
        }
    },
    method: {
        type: String,
        required: true,
        lowercase: true,
    },
    rating: [ratingSchema],
    avgRating: Number
})

module.exports = mongoose.model('recepies', recipeSchema)
