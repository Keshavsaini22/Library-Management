const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const BooksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
    }
    ,
    gerne: {
        type: String,
        enum: ["History", "Maths", "Geography", "English", "Hindi"],
        required: true
    },
    author: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model("books", BooksSchema)