const mongoose = require('mongoose');
var conn = mongoose.Collection;
var delieverySchema = new mongoose.Schema({

    type:String
    
});

var DelieveryModel = mongoose.model('delievery', delieverySchema);
module.exports = DelieveryModel;