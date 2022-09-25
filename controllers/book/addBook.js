const { Book } = require('../../models/Book');

const addBook = async (req, res, next) => {
  // const { _id } = req.user;
//   const result = await Book.create({ ...req.body, /*owner:_id*/ });
  const result = await Book.create({ ...req.body });
  
    res.json({
       result
   })
}


module.exports=addBook