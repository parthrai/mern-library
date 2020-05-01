const { validationResult } = require('express-validator')

const Author = require('../models/author')
const Book = require('../models/book')


// Get list of all the authors
async function index(req,res,next) {

    let authors;
    try{
         authors = await Author.find()

    }catch (e) {
        return  res.status(417).json({message:e})
    }

    res.status(200).json({authors})

}


// Get info for a specific author
const show = async (req,res,next)=> {

    const authorId = req.params.author_id

    let author;
    try {
        author = await Author.findById(authorId)

    } catch (e) {
        return res.status(422).json({message:"Invalid author id"})

    }
    return res.status(200).json({author:author.toObject({getters:true})})


}



// Create a new author

const store = async (req,res) =>{

    const {  name, email, phone} = req.body //LEFT HAND SIDE IS CALLED OBJECT DESTRUCTURING


    const error =  validationResult(req)

    if(!error.isEmpty()){

        return res.status(422).json({message:error})
    }

    const newAuthor = new Author({
        name,
        email,
        phone,

    })


    try{
        await newAuthor.save()
    }catch (e) {
        return res.status(422).json({message:"Data not saved!"})
    }



    return res.status(201).json({author:newAuthor})
}


//Update an author
const update= async (req,res) =>{


    const author_id = req.params.author_id
    const { email,phone } = req.body

    let author;
    try{
         author = await Author.findById(author_id)

    }catch (e) {
        return res.status(422).json({message:e})
    }

    author.email = email
    author.phone = phone

    try{
        await author.save()

    }catch (e) {
        return res.status(417).json({message:e})

    }



    res.status(202).json({author})
}


// Delete an author
const deleteAuthor = async (req,res) =>{

    const author_id = req.params.author_id


    let author;

    try{
         author = await Author.findById(author_id)
    }catch (e) {
        return res.status(422).json({message:e})
    }


    try{
        await Book.remove({author_id:author_id})

    }catch (e) {
        return res.status(422).json({message:"Unable to delete books"})

    }



    try{
        await author.remove()
    }catch (e) {
        return res.status(417).json({message:e})
    }


    res.status(202).json({message:"Author deleted"})
}

exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.deleteAuthor = deleteAuthor