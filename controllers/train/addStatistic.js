const { Train } = require('../../models/Train');


const addStatistic = async (req, res, next) => {
    const { _id } = req.user;
    const { date, amountPages } = req.body;

    const newStatistic = {
        date,
        amountPages
    }

    const train = await Train.findOne({ owner: _id });
    const arrStatistic = [...train.statistic, newStatistic]

    const newListTrain= await Train.findOneAndUpdate({ owner: _id }, {statistic:arrStatistic},{new:true})
    
    res.json(newListTrain.statistic);
}

module.exports = addStatistic;