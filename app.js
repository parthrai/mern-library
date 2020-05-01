const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const booksRoutes = require('./routes/books_routes')
const authorRoutes = require('./routes/authors_routes')

const app = express();

//Routes

app.use(bodyParser.json())

app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type , Accept')

    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')


    next();

})

app.use('/api/books',booksRoutes)
app.use('/api/authors',authorRoutes)


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-hti6d.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,{useNewUrlParser:true, useUnifiedTopology: true})
    .then( () => {
        app.listen(process.env.PORT)
        console.log("connected");
    }).catch(()=>{

        console.log("Unable to connect to mongoDB")
})
