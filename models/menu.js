var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
  category: {type:String, 
}
,email:{
    type:String, 
}
,
dish_details:{
    type:String
},
image:{
    type:String
},
unit_price:{
    type:Number,
}
,
dish:{
type:String,

}
,
stock:{
type:String,
}
});

module.exports = mongoose.model('menu', menuSchema);