const { Train } = require('../../models/Train');


const addTrain = async (req, res, next) => {
    const { _id } = req.user;

    const result = await Train.create({ ...req.body, owner:_id });
  
    res.json(
       result.startDate,
       result.finishDate
   )
}

module.exports = addTrain;