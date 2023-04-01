//create an model of FoundItems from FormFound.ejs
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create model for founditem
const FoundItemSchema = new Schema({
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
    foundLocation: {
        type: String,
        required: true
    },
    foundDate: {
        type: Date,
        required: true
    },
    foundTime: {
        type: String,
        required: true
    },
    image:{
            type: String,
            required: true
    }
    ,
    founderName: { 
        type: String,
        required: true
    },
    founderEmail: {
        type: String,
        required: true
    },
    founderPhone: {
        type: String,
        required: true
    }
})

const FoundItem = mongoose.model('FoundItems',FoundItemSchema);
module.exports = FoundItem;