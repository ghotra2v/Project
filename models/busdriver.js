
// bus driver Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const BusdriverSchema = new Schema({
    first: {
        type: String,
        reqire: true
    },
    last: {
        type: String,
        require: true
    },
    SSN: {
        type: Number,
        require: true
    },
    bus: {
        type: Schema.Types.ObjectId,
        ref: "Bus"
    }
})

const busdriver = mongoose.model('Busdriver', BusdriverSchema)


module.exports = busdriver
