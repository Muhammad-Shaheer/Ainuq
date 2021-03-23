const mongoose = require('mongoose');
var conn = mongoose.Collection;
var categoriesSchema = new mongoose.Schema({
 
    name:String
   
});

var CategoriesModel = mongoose.model('categories', categoriesSchema);
module.exports = CategoriesModel;