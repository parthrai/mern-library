const express = require('express')
const router = express.Router()

const booksController = require('../controllers/books-controller')

router.get('/',booksController.index)
router.get('/:book_id', booksController.show)
router.get('/author/:author_id', booksController.BooksByAuthor)

module.exports = router