const mongoose = require('mongoose');
var conn = mongoose.Collection;
var glassSchema = new mongoose.Schema({

    

    material: [{ type: mongoose.Schema.Types.ObjectId, ref: 'material' }],
    

    type:String,
    price:Number
});

var GlassModel = mongoose.model('glass', glassSchema);
module.exports = GlassModel;
