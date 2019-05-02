const { MongoClient, ObjectId } = require('mongodb')
const model = require('../models/book')
const url = 'mongodb://localhost:27017'
const dbName = 'MongodbBook'
let client = null

class BookController {
  static create(req, res) {
    client = new MongoClient(url, { useNewUrlParser: true })
    client.connect(function(err) {
      const db = client.db(dbName)
      let newBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      }
      db
        .collection('book')
        .insertOne(newBook)
        .then(newBookCreate => {
          res.status(201).json({
            newBookCreate,
            message: `Success Create`
          })
          client.close()
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
  }

  static findAll(req, res) {
    client = new MongoClient(url, { useNewUrlParser: true })
    client.connect(function(err) {
      const db = client.db(dbName)
      const col = db.collection('book')
      col
        .find({})
        .toArray(function(err, docs){
          res.status(200).json(docs)
          client.close()
        })
    })
  }

  static update(req, res) {
    client = new MongoClient(url, { useNewUrlParser: true })
    client.connect(function(err) {
      const db = client.db(dbName)
      const col = db.collection('book')
      let id = {
        _id: ObjectId(req.params.id)
      }
      let body = {
        $set: req.body
      }
      col
        .updateOne(id, body, function(err, updateData) {
          res.status(200).json(`Success Updated`)
          client.close()
        })
    })
  }

  static remove(req, res) {
    client = new MongoClient(url, { useNewUrlParser: true })
    client.connect(function(err) {
      const db = client.db(dbName)
      const col = db.collection('book')
      let id = {
        _id: ObjectId(req.params.id)
      }
      col
        .deleteOne(id, function(err, deleteData) {
          res.status(200).json(`Success Deleted`)
        })
    })
  }
}

module.exports = BookController