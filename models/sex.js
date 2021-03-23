const mongoose = require('mongoose');
var conn = mongoose.Collection;
var sexSchema = new mongoose.Schema({

    sex:String

});

var SexModel = mongoose.model('sex', sexSchema);
module.exports = SexModel;