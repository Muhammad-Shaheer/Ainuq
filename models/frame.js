const mongoose = require('mongoose');
var conn = mongoose.Collection;
var frameSchema = new mongoose.Schema({
    name:String,
    price:Number,
    Image:String,

    weight: [{ type: mongoose.Schema.Types.ObjectId, ref: 'weight' }],
    sex: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sex' }],
    material: [{ type: mongoose.Schema.Types.ObjectId, ref: 'material' }],
    thickness: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thickness' }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }]
});

var FrameModel = mongoose.model('frame', frameSchema);
module.exports = FrameModel;