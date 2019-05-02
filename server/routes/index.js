const router = require('express').Router()
const bookRoutes = require('../routes/book')

router.use('/books', bookRoutes)

module.exports = router