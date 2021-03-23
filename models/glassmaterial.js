const mongoose = require('mongoose');
var conn = mongoose.Collection;
var glassmaterialSchema = new mongoose.Schema({
    type:String
});

var GlassmaterialModel = mongoose.model('glassmaterial', glassmaterialSchema);
module.exports = GlassmaterialModel;