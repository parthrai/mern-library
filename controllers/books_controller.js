const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const Book = require('../models/book')
const Author = require('../models/author')


async function index(req,res,next) {

    let books;
    try{
        books = await Book.find()

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

    const books = await Book.find({author_id:authorId});

    //OLD Code
    //const books = DUMMY_DB.filter( b => b.author === authorId)

    if(books.length == 0){
        return res.status(404).json({message:"Invalid author id"})
    }

    return res.status(200).json({books})

}

const store = async (req,res) =>{

    const {  name, description, author_id} = req.body //LEFT HAND SIDE IS CALLED OBJECT DESTRUCTURING





    let author;
    try{
      author = await Author.findById(author_id)

    }catch(e){
        return res.status(500).json({message:e})

    }


   const error =  validationResult(req)

    if(!error.isEmpty()){

        return res.status(422).json({message:error})
    }

    const newBook = new Book({
        name,
        description,
        author_id
    })





    try{


        await newBook.save()
        author.books.push(newBook)
        await author.save()

    }catch (e) {
        return res.status(500).json({message:"e"})
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

    let book;
    try{
         book = await Book.findById(book_id).populate('author_id')
    }catch (e) {
        return res.status(422).json({message:e})
    }

    try{

        await book.remove()
        book.author_id.books.pull(book)
        await book.author_id.save()


    }catch (e) {
        return res.status(417).json({message:e})
    }



    res.status(202).json({message:"Book deleted"})
}

exports.index = index
exports.show = show
exports.BooksByAuthor = BooksByAuthor
exports.store = store
exports.update = update
exports.deleteBook = deleteBook