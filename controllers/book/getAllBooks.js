const { Book } = require('../../models/Book');

const getAllBooks = async (req, res, next) => {
    const { _id } = req.user;

    const result = await Book.find({ owner:_id }, "-createdAt -updatedAt")

    res.json({
        result
    })
}

module.exports = getAllBooks;