
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create model for lostitem
const LostItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    secondaryColor: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lostLocation: {
        type: String,
        required: true
    },
    lostDate: {
        type: Date,
        required: true
    },
    lostTime: {
        type: String,
        required: true
    },
    image:{
            type: String,
            required: true
    }
    ,
    ownerName: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    ownerPhone: {
        type: String,
        required: true
    }

});

//exports
const lostItem = mongoose.model('LostItem', LostItemSchema);

module.exports = lostItem;
