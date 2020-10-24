const mongoose = require('mongoose');
var conn =mongoose.Collection;
var categorySchema =new mongoose.Schema({
    category: {type:String, 
        required: true,
    },
    category_details: {type:String,
    },
	email: {
        type:String, 
        required: true, 
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
    });

var categoryModel = mongoose.model('category',categorySchema);
module.exports=categoryModel;