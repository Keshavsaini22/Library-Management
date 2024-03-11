const CustomError = require('../libs/error');
const BooksModel = require('../models/BooksModel');

exports.addBook = async (payload) => {
    const userId = payload.userId
    const image = payload.files.image[0].path;
    if (!image)
        throw new CustomError("Image of book is required", 401);
    const { name, gerne, author, stock, price } = payload.body;
    console.log('name, gerne, author, stock, price : ', name, gerne, author, stock, price);
    if (!name || !gerne || !author || !stock || !price)
        throw new CustomError("Details of book are not complete", 401);
    const response = await BooksModel.create({ admin: userId, name, gerne, author, stock, price, image })
    console.log('response: ', response);
    return response;
}

exports.fetchAllbooks = async (payload) => {
    const data = await BooksModel.find({ admin: payload.userId }).sort({ createdAt: -1 });
    return data;
}

exports.fetchhomebooks = async (payload) => {
    const query = {}
    const search = payload.query.search
    console.log('search: ', search);
    if (search) {
        // query.name = { $regex: new RegExp(search, 'i') }
        // query.author = { $regex: new RegExp(search, 'i') }
        const regex = new RegExp(search, 'i');
        query.$or = [
            { name: { $regex: regex } },
            { author: { $regex: regex } },
            { gerne: { $regex: regex } }
        ];
    }
    const data = await BooksModel.find(query).sort({ createdAt: -1 });
    return data;
}

exports.updateBook = async (payload) => {
    const bookId = payload.query.bookId;
    const { name, gerne, author, stock, price } = payload.body;
    const userId = payload.userId
    const book = await BooksModel.findById(bookId);
    if (!book)
        throw new CustomError("No book exist", 401)
    if (book.admin == userId) {
        const data = await BooksModel.findByIdAndUpdate(bookId, { name, gerne, author, stock, price }, { new: true });
        return data;
    }
    throw new CustomError("Invalid User", 401)
}

exports.deleteBook = async (payload) => {
    const bookId = payload.query.bookId;
    const userId = payload.userId
    const book = await BooksModel.findById(bookId);
    if (!book)
        throw new CustomError("No book exist", 401)
    if (book.admin == userId) {
        const data = await BooksModel.findByIdAndDelete(bookId);
        return data;
    }
    throw new CustomError("Invalid User", 401)
}