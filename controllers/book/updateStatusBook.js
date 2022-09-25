const {Book}= require('../../models/Book')

const updateStatusBook = async (req, res, next) => {
    const { _id } = req.user;
    const { status} = req.body;
    
    const result=await Book.findByIdAndUpdate(_id, { status }, {new:true});
    
    res.json({
        result: {
            status:result.status
        }
})
}

module.exports=updateStatusBook