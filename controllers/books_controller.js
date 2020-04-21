const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const Book = require('../models/book')




// const index = (req,res,next)=>{
//
//     res.status(200).json({books: DUMMY_DB})
// }


async function index(req,res,next) {

    try{
        const books = await Book.find()

    }catch (e) {
       return  res.status(417).json({message:e})
    }

    res.status(200).json({books})

}

const show = async (req,res,next)=> {

    const bookId = req.params.book_id

    try {
        const book = await Book.findById(bookId)

    } catch (e) {
        return res.status(422).json({message:"Invalid book id"})

    }
    return res.status(200).json({book:book.toObject({getters:true})})


}












const  BooksByAuthor = async (req,res,next)=>{

    const authorId = req.params.author_id //a1

    const books = await Book.find({author:authorId});

    //OLD Code
    //const books = DUMMY_DB.filter( b => b.author === authorId)

    if(books.length == 0){
        return res.status(404).json({message:"Invalid author id"})
    }

    return res.status(200).json({books})

}

const store = async (req,res) =>{

    const {  name, description, author} = req.body //LEFT HAND SIDE IS CALLED OBJECT DESTRUCTURING

    // INSTEAD OF ABOVE STEP YOU CAN ALSO DO THIS

    // const id = req.body.id
    // const title = req.body.title
    // const description = req.body.description

   const error =  validationResult(req)

    if(!error.isEmpty()){

        return res.status(422).json({message:error})
    }

    const newBook = new Book({
        name,
        description,
        author
    })


    try{
        await newBook.save()
    }catch (e) {
        return res.status(422).json({message:"Data not saved!"})
    }



    return res.status(201).json({book:newBook})
}


const update= async (req,res) =>{


    const book_id = req.params.book_id
    const { name,description } = req.body

    try{
        const book = await Book.findById(book_id)

    }catch (e) {
        return res.status(422).json({message:e})
    }

    book.name = name
    book.description = description

    try{
        await book.save()

    }catch (e) {
        return res.status(417).json({message:e})

    }



    // OLD CODE WITH DUMMY DB

    // const book = DUMMY_DB.find( b => b.id === book_id )
    // const bookIndex = DUMMY_DB.findIndex( b => b.id === book_id)
    //
    // book.name = name
    // book.description = description
    //
    // DUMMY_DB[bookIndex] = book

    res.status(202).json({book})
}


const deleteBook = async (req,res) =>{

    const book_id = req.params.book_id

    try{
        const book = await Book.findById(book_id)
    }catch (e) {
        return res.status(422).json({message:e})
    }

    try{
        await book.remove()
    }catch (e) {
        return res.status(417).json({message:e})
    }

    //OLD CODE

    // DUMMY_DB = DUMMY_DB.filter( b => b.id !== book_id)


    res.status(202).json({message:"Book deleted"})
}

exports.index = index
exports.show = show
exports.BooksByAuthor = BooksByAuthor
exports.store = store
exports.update = update
exports.deleteBook = deleteBook