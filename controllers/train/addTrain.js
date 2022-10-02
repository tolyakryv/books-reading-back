const { Train } = require('../../models/Train');
const { Book } = require('../../models/Book');


const addTrain = async (req, res, next) => {
    const { _id } = req.user;
    const arrBooks = req.body.book;
    const arrNewBooks = [];

    for (const book of arrBooks) {
        const newBook = await Book.findOneAndUpdate({ _id: book, owner: _id },{status:"readingNow"},{new:true});
        await arrNewBooks.push(newBook);
    }
       
    const newTrain = await Train.create({owner:_id, startDate: req.body.startDate, finishDate: req.body.finishDate, book: arrNewBooks   })
    
    res.json(newTrain)
}

module.exports = addTrain;
