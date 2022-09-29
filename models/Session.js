const { Schema, model } = require('mongoose');
const { schemaValidation } = require('../helpers');

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
},{versionKey:false})

sessionSchema.post('save', schemaValidation)

const Session = model('session', sessionSchema);


module.exports = {
    Session
}