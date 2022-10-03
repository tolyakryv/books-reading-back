const { Book } = require('../../models/Book')
const {Train } = require('../../models/Train')

const updateStatusBook = async (req, res, next) => {
    const{_id}=req.user
    const { bookId } = req.params;
    const { status} = req.body;
    
    const oldBook=await Book.findOne({ _id:bookId, owner:_id });
    const train = await Train.findOne({ owner: _id });
  
    for (const book of train.book) {
        if (book.title === oldBook.title) {
            book.status=status
        }            
    }
    const newBooks=await Train.findOneAndUpdate({owner: _id},{book:train.book},{new:true})
       
    res.json(newBooks.book);
}

module.exports=updateStatusBook