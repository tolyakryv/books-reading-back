const { Train } = require('../../models/Train')

const getTrain = async (req, res, next) => {
    const { _id } = req.user;

    const train = await Train.findOne({ owner: _id });

    res.json(
        train
    )
}

module.exports=getTrain