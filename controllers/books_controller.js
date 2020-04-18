const uuid = require('uuid/v4')
const { validationResult } = require('express-validator')

const Book = require('../models/book')


let DUMMY_DB=[
    {
        id:'b1',
        name:'Book 1',
        description: 'some fancy description',
        author:'a1'
    },
    {
        id:'b2',
        name:'Second Book',
        description: 'some fancy description about second book',
        author:'a1'

    },
    {
        id:'b3',
        name:'Third Book',
        description: 'some fancy description for b3',
        author:'a2'
    }

]


// const index = (req,res,next)=>{
//
//     res.status(200).json({books: DUMMY_DB})
// }


function index(req,res,next){

    res.status(200).json({books: DUMMY_DB})
}


const show = (req,res,next)=>{

    const bookId = req.params.book_id

    const result = Book.findById(bookId).then((book)=>{

        if(!book){
            return res.status(404).json({message:"Invalid book id"})
        }

        return res.status(200).json({book:book.toObject({getters:true})})

    })



}


const BooksByAuthor = (req,res,next)=>{

    const authorId = req.params.author_id

    const books = DUMMY_DB.filter( b => b.author === authorId)

    if(books.length == 0){
        return res.status(404).json({message:"Invalid author id"})
    }

    return res.status(200).json({books})

}

const store = (req,res) =>{

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
        newBook.save()
    }catch (e) {
        return res.status(422).json({message:"Data not saved!"})
    }



    return res.status(201).json({book:newBook})
}


const update= (req,res) =>{

    const book_id = req.params.book_id
    const { name,description } = req.body

    const book = DUMMY_DB.find( b => b.id === book_id )
    const bookIndex = DUMMY_DB.findIndex( b => b.id === book_id)

    book.name = name
    book.description = description

    DUMMY_DB[bookIndex] = book

    res.status(202).json({book})
}


const deleteBook = (req,res) =>{

    const book_id = req.params.book_id //b2

    DUMMY_DB = DUMMY_DB.filter( b => b.id !== book_id)


    res.status(202).json({message:"Book deleted"})
}

exports.index = index
exports.show = show
exports.BooksByAuthor = BooksByAuthor
exports.store = store
exports.update = update
exports.deleteBook = deleteBook