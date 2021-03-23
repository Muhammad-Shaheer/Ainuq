const mongoose = require('mongoose');
var conn = mongoose.Collection;
var viewSchema = new mongoose.Schema({

    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'frame' }],

    date:String
});

var ViewModel = mongoose.model('view', viewSchema);
module.exports = ViewModel;