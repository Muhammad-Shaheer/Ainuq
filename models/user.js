var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: {
    type: String,
    select: false
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  
});

module.exports = mongoose.model('User', userSchema);