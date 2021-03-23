const mongoose = require('mongoose');
var conn = mongoose.Collection;
var thicknessSchema = new mongoose.Schema({
    thickness:String
});

var ThicknessModel = mongoose.model('thickness', thicknessSchema);
module.exports = ThicknessModel;