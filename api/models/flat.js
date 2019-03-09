const mongoose = require('mongoose');

const flatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    phNo: {
        type: Number,
        required: true
    },
    hNo: {
        type: Number,
        required: true
    },
    vNo: {
        type: String,
        required: true
    }
});

//model gives a constructor
module.exports = mongoose.model('Flat', flatSchema);