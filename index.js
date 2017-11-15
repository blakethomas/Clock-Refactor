const express = require('express')
const {MongoClient} = require('mongodb')
const moment = require('moment')
const timezone = require('moment-timezone')
const path = require('path')
const publicPath = path.join(__dirname, 'public')
const app = express()

app.use(express.static(publicPath))
MongoClient.connect("mongodb://localhost/clock", (err, db) => {
  const timezones = db.collection('timezones')

  app.get('/timezones', (req,res) => {
    timezones
    .find({})
    .toArray()
    .then(results => {
      res.json(results)
    })
    .catch(err => console.log(err))
  })
  app.listen(3000, () => console.log('listening on port 3000.'))
})
