const express = require('express')
const app = express()
const port = 3000
const index = require('./routes/index')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', index)

app.listen(port, () => {
  console.log(`Listen in port ${port}`)
})