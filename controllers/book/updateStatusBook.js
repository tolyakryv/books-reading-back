const {Book}= require('../../models/Book')

const updateStatusBook = async (req, res, next) => {
    const { bookId } = req.params;
    const { status} = req.body;
    
    const result=await Book.findByIdAndUpdate(bookId, { status }, {new:true});
    
    res.json({
        status: result.status
    })
}

module.exports=updateStatusBook