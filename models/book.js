const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({

    name: {type:String, required:true},
    description: {type:String, required:true},
    author_id:{type:mongoose.Types.ObjectId,required:true,ref:'Author'}
    //author: {type:String, required:true}

})

module.exports = mongoose.model("Book",bookSchema)