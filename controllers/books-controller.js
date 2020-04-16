const DUMMY_DB=[
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
    const book = DUMMY_DB.find( b => {
        return b.id === bookId
    })

    if(!book){
        return res.status(404).json({message:"Invalid book id"})
    }

    return res.status(200).json({book})

}


const BooksByAuthor = (req,res,next)=>{

    const authorId = req.params.author_id

    const results = []

    const books = DUMMY_DB.find( b => {
        if(b.author === authorId){
            results.push(b)
        }
    })

    if(results.length == 0){
        return res.status(404).json({message:"Invalid author id"})
    }


    return res.status(200).json({books:results})

}

exports.index = index
exports.show = show
exports.BooksByAuthor = BooksByAuthor