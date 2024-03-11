const CustomError = require('../libs/error');
const { bookService } = require('../services');

exports.addBook = async (req, res) => {
    try {
        if (!res.locals.isAuthenticated)
            throw new CustomError("User not Authenticated", 400);
        const response = await bookService.addBook({ userId: req.user.ID, files: req.files, body: req.body });
        return res.status(201).json(response)
    }
    catch (e) {
        return res.status(e?.code || 500).json({ message: e?.message })
    }
}

exports.fetchAllbooks = async (req, res) => {
    try {
        if (!res.locals.isAuthenticated)
            throw new CustomError("User not Authenticated", 400);
        const response = await bookService.fetchAllbooks({ userId: req.user.ID, query: req.query });
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(e?.code || 500).json({ message: e?.message })
    }
}

exports.fetchhomebooks = async (req, res) => {
    try {

        const response = await bookService.fetchhomebooks({ query: req.query });
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(e?.code || 500).json({ message: e?.message })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const response = await bookService.updateBook({ userId: req.user.ID, query: req.query, body: req.body });
        return res.status(200).json(response)
    } catch (e) {
        return res.status(e?.code || 500).json(e.message)
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const response = await bookService.deleteBook({ userId: req.user.ID, query: req.query });
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(e?.code || 500).json(e.message)
    }
}
