const mongoose = require('mongoose')
 
const cartModel = new mongoose.Schema({
    combinedId:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String
    },
    bookId:{
        type:String
    },name:{
        type:String,
        required : true
    },
     auther:{
        type:String,
        required : true,
    },
    price:{
        type:String,
        required:true
    },
    available:{
        type:String,
        required:true
    },
    pub:{
        type:String,
        required:true
    },
    pid:{
        type:String,
        required:true
    }, 
    image:{
        type:String
    }
})

module.exports = mongoose.model('cart', cartModel)