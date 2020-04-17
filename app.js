const express = require('express')
const bodyParser = require('body-parser')

const booksRoutes = require('./routes/books_routes')
const authorRoutes = require('./routes/authors_routes')

const app = express();

app.use(bodyParser.json())
app.use('/api/books',booksRoutes)
//app.use('/api/author',authorRoutes)






app.listen(5000)