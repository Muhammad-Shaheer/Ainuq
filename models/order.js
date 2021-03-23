const mongoose = require('mongoose');
var conn = mongoose.Collection;
var orderSchema = new mongoose.Schema({

   

    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    glasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'glass' }],
    shade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shades' }],
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'frame' }],
    delievery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'delievery' }],
    status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orderstatus' }],

    date:String,
    time:Number,

    amount:String


});

var OrderModel = mongoose.model('order', orderSchema);
module.exports = OrderModel;