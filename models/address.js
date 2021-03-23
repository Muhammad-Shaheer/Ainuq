const mongoose = require('mongoose');
var conn = mongoose.Collection;
var addressSchema = new mongoose.Schema({
    User: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    address:String,
    logitude:Number,
    latitude:Number
});

var AddressModel = mongoose.model('address', addressSchema);
module.exports = AddressModel;