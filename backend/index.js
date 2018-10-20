const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const mongoose = require('mongoose');

mongoose.connect('mongodb://tas:tas123@ds131753.mlab.com:31753/tasy')
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.static('public'))

app.use(bodyParser.json())

app.use('/',require('./routes/routes'))

app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

const server = app.listen(port, () => console.log(`Uber Book app listening on port ${port}!`))

module.exports = server