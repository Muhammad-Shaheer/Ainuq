const mongoose = require('mongoose');
var conn = mongoose.Collection;
var searchhistorySchema = new mongoose.Schema({

    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    searchtext:String
});

var SearchhistoryModel = mongoose.model('searchhistory', searchhistorySchema);
module.exports = SearchhistoryModel;