const mongoose = require('mongoose');
var conn = mongoose.Collection;
var weightSchema = new mongoose.Schema({

    material:String
    
});

var WeightModel = mongoose.model('weight', weightSchema);
module.exports = WeightModel;