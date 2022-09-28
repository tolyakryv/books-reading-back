const { Train } = require('../../models/Train');
const { Book } = require('../../models/Book');

const addBookInTrain = async (req, res, next) => {
    const { _id } = req.user;
    const { bookId } = req.params;

    await Book.findByIdAndUpdate(bookId, {inTrain:true}, {new:true});
    
    const books=await Book.find();
    const newBookInTrain = await books.filter(book => book.inTrain === true);

    const newListTrain= await Train.findOneAndUpdate({ owner: _id }, {book:newBookInTrain},{new:true})
    
    res.json(newListTrain.book);
}

module.exports = addBookInTrain;