const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { schemaValidation } = require('../helpers');

const trainingSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: [true, "startDate must be exist"],
        },
        finishDate: {
            type: Date,
            required: [true, "finishDate must be exist"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        book: [{
            title: {
                type: String,
                required: [true, "Title must be exist"],
            },
            author: {
                type: String,
                required: [true, "Title must be exist"],
            },
            publicDate: {
                type: Number,
                required: [true, "publicDate must be exist"],
            },
            amountPages: {
                type: Number,
                required: [true, "amountPage must be exist"],
            },
            status: {
                type: String,
                enum: ["goingToRead", "readingNow", "alreadyRead"],
                default: "goingToRead",
            },
            
        }],
        statistic: [{
            date: {
                type: String,
                required: [true, "date must be exist"],
            },

            amountPages: {
                type: Number,
                required: [true, "amountPage must be exist"],
            }
        }]
    },
    { versionKey: false }
)


trainingSchema.post('save', schemaValidation)

const addTimeTrainSchemaJoi = Joi.object({
    startDate:Joi.date().max(Joi.ref('finishDate')).required(),
    finishDate:Joi.date().required()
});

const updateStatusSchemaJoi = Joi.object({
    status:Joi.string().valid("goingToRead", "readingNow", "alreadyRead").required()
})


const schemaJoi = {
    addTimeTrain:addTimeTrainSchemaJoi,
    updateStatusSchema:updateStatusSchemaJoi    
}

const Train = model('train', trainingSchema);

module.exports = {
    Train,
    schemaJoi
}