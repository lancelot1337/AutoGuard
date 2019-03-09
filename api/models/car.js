const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    carNo: {
        type: String,
        required: true
    },
    flat: {
        type: mongoose.Schema.Types.ObjectId,
        //name of model
        ref: 'Flat',
        required: true
    }
});

//model gives a constructor
module.exports = mongoose.model('Car', carSchema);