//Bus Schema

const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const BusSchema = new Schema({
    capacity: {
        type: Number,
        require: [true]
    },    
    model: {
        type: String,
        require: true
    },
  
    make: {
        type: String,
        require: true
    },
    driver:{
        type: Schema.Types.ObjectId,
        ref: "busdriver"
    }

})

module.exports = mongoose.model('Bus', BusSchema)