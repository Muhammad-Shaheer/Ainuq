const mongoose = require('mongoose');
var conn = mongoose.Collection;
var coloursSchema = new mongoose.Schema({

    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'frame' }],
    
    name:String,
    code:String
   
});

var ColourModel = mongoose.model('colour', coloursSchema);
module.exports = ColourModel;