const express = require('express')

const booksRoutes = require('./routes/books-routes')

const app = express();

app.use('/api/books',booksRoutes)





app.listen(5000)