const { Book } = require('../../models/Book')
const {Train} = require('../../models/Train')

const updateStatusBook = async (req, res, next) => {
    const{_id}=req.user
    const { bookId } = req.params;
    const { status} = req.body;
    
    await Book.findByIdAndUpdate(bookId, { status }, { new: true });
    
    const books=await Book.find();
    const newBookInTrain = await books.filter(book => book.inTrain === true);

    const newListTrain= await Train.findOneAndUpdate({ owner: _id }, {book:newBookInTrain},{new:true})
    
    res.json(newListTrain.book);
}

module.exports=updateStatusBook