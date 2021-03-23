const mongoose = require('mongoose');
var conn = mongoose.Collection;
var shadesSchema = new mongoose.Schema({
    colour:String,
    price:String
});

var ShadesModel = mongoose.model('shades', shadesSchema);
module.exports = ShadesModel;