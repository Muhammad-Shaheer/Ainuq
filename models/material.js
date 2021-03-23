const mongoose = require('mongoose');
var conn = mongoose.Collection;
var materialSchema = new mongoose.Schema({
    name:String,
    price:String
});

var MaterialModel = mongoose.model('material', materialSchema);
module.exports = MaterialModel;