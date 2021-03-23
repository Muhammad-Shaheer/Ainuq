const mongoose = require('mongoose');
var conn = mongoose.Collection;
var eyemeasureSchema = new mongoose.Schema({
    
    User: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

    measurement:Number

});

var EyemeasureModel = mongoose.model('eyemeasure', eyemeasureSchema);
module.exports = EyemeasureModel;
