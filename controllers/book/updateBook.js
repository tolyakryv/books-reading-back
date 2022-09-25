const {Book}= require('../../models/Book')

const updateBook = async (req, res, next) => {
    const { _id } = req.user;
    const { rating, resume } = req.body;
    
    const result=await Book.findByIdAndUpdate(_id, { rating, resume }, {new:true});
    
    res.json({
        result: {
            rating: result.rating,
            resume: result.resume
        }
})
}

module.exports=updateBook