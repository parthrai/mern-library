const express = require('express')
const router = express.Router()

const { check } = require('express-validator')

const authorsController = require('../controllers/authors_controller')

router.get('/',authorsController.index)
router.get('/:author_id', authorsController.show)
router.post('/',[check('name').not().isEmpty(), check('email').isEmail()],authorsController.store)
router.patch('/:author_id',authorsController.update)
router.delete('/:author_id',authorsController.deleteAuthor)

module.exports = router