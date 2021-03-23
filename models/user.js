const mongoose = require('mongoose');
var conn = mongoose.Collection;
var userSchema = new mongoose.Schema({
    Firstname:String,
    Lastname:String,
    Age:Number,
    Phone:Number,
    Email:String,
    Password:String
});

var UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;