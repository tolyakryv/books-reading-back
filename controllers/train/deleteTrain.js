const { Train } = require('../../models/Train');

const deleteTrain = async (req, res, next) => {
    const { _id } = req.user;

    await Train.findOneAndDelete({ owner: _id })
    
    res.json(
        "Delete train"
    )
 
}

module.exports=deleteTrain