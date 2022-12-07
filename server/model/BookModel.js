const mongoose = require('mongoose')
 
const bookModel = new mongoose.Schema({
    name:{
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

module.exports = mongoose.model('books', bookModel)