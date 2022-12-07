const mongoose = require('mongoose')
 
const buyModel = new mongoose.Schema({
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
    },
    name:{
        type:String
    },
     auther:{
        type:String
    },
    price:{
        type:String
    },
    available:{
        type:String
    },
    pub:{
        type:String
    },
    pid:{
        type:String
    }, 
    image:{
        type:String
    }
})

module.exports = mongoose.model('buy', buyModel)