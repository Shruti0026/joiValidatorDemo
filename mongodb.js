const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(express.json())
var database

app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})

app.listen((3000), () => {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, result) => {
        if (error) throw error
        database = result.db('productList')
        console.log('connection sucessful')
    })
})