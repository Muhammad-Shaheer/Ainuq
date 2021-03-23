const mongoose = require('mongoose');
var conn = mongoose.Collection;
var cardSchema = new mongoose.Schema({

    User: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

    name:String,
    number:Number,
    cvv:String

});

var CardModel = mongoose.model('card', cardSchema);
module.exports = CardModel;