const express = require('express')
const router = express.Router()

const booksController = require('../controllers/books_controller')

router.get('/',booksController.index)
router.get('/:book_id', booksController.show)
router.get('/author/:author_id', booksController.BooksByAuthor)

router.post('/',booksController.store)
router.patch('/:book_id',booksController.update)
router.delete('/:book_id',booksController.deleteBook)

module.exports = router