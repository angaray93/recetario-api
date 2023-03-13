const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./models/user')
const recipeSchema = require('./models/recipe')
const  ObjectID = require('mongodb').ObjectId


const app = express();

// MongoDB connection
mongoose.connect('mongodb://agaray:recipes@localhost:27017/recipesdb?authSource=admin')
.then(() => console.log('conectado a Mongo'))
.catch((error) => console.error(error))

//Middleware
app.use(express.json())

const database = client.db("recipesdb");

// Routes
app.post('/new_user', async (req,res) => {
    const user = userSchema(req.body);
    try {
        const dataToSave = await user.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.get('/users', async (req,res) => {
    try {
        const data = await userSchema.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/new_recipe', async (req,res) => {
    const recipe = recipeSchema(req.body);
    try {
        const dataToSave = await recipe.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/rate', (req,res) => {
    res.send(req.body)
})

app.get('/recipes', async (req,res) => {
    const user = req.body.userId;
    try {
        let collection = await recipeSchema.find({ "userId": new ObjectID(user) });
        res.json(collection)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
})

app.get('/recipesbyingredient', async (req,res) => {
    const { ingredients } = req.body;
    const ingredientsArray = ingredients.map(a => a.name);
    //const ingredientsObj = await ingredientsSchema.find("ingredients": {$in:ingredientsArray});
    //const ingredientes = database.collection("ingredients");

    console.log(ingredientsArray)
    try {
        let collection = await recipeSchema.find(
        {
            "ingredients": {$in:ingredientsArray},
            //"ingredients":{$size:1}
        });
        console.log(collection)
        res.json(collection)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
})

app.listen(3000, () => console.log("Esperando en puerto 3000..."))