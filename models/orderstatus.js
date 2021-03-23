const mongoose = require('mongoose');
var conn = mongoose.Collection;
var orderstatusSchema = new mongoose.Schema({

    status:String
    
});

var OrderstatusModel = mongoose.model('orderstatus', orderstatusSchema);
module.exports = OrderstatusModel;