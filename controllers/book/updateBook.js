const {Book}= require('../../models/Book')

const updateBook = async (req, res, next) => {
    const { bookId } = req.params;
    const { rating, resume } = req.body;
    
    const result=await Book.findByIdAndUpdate(bookId, { rating, resume }, {new:true});
    
    res.json({
        rating: result.rating,
        resume: result.resume
    })
}

module.exports=updateBook