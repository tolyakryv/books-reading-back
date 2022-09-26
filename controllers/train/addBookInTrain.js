const { Train } = require('../../models/Train');
const { Book } = require('../../models/Book');
const { RequestError } = require("../../helpers");


const addBookInTrain = async (req, res, next) => {
    const { _id } = req.user;
    const { bookId } = req.params;

    const newBookInTrain = await Book.findById(bookId);
    if (!newBookInTrain) {
        throw RequestError(404, "Not found this book")
    }

    const train = await Train.findOne({ owner: _id });
    const arrBook = [...train.book, newBookInTrain]

    const newListTrain= await Train.findOneAndUpdate({ owner: _id }, {book:arrBook},{new:true})
    
    res.json(newListTrain.book);
}

module.exports = addBookInTrain;