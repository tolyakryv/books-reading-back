const { Train } = require('../../models/Train');
const { Book } = require('../../models/Book');
const { RequestError } = require("../../helpers");

const deleteBookInTrain = async (req, res, next) => {
    const { _id } = req.user;
    const { bookId } = req.params;
    const train = await Train.findOne({ owner: _id });
    const books = train.book;

    const deleteBook = await Book.findById(bookId);
    if (!deleteBook) {
        throw RequestError(404, "Not found this book")
    }

    const newArrBookInTrain = await books.filter(book => book.title !== deleteBook.title );
    console.log(newArrBookInTrain);
    const result = await Train.findOneAndUpdate({ owner: _id }, { book: newArrBookInTrain }, { new: true });
    
    res.json(
        result.book
    )
}

module.exports=deleteBookInTrain