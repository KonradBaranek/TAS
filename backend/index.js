const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const passport = require('passport');


const mongoose = require('mongoose')
//Zajrzyjcie do pliku db.js tam wpiszcie link do bazy
//mongoose.connect(require('./db'))
mongoose.connect('mongodb://admin_db:Admin1@ds045679.mlab.com:45679/tsa_project')
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

require('./config/passport');
app.use(passport.initialize());

app.use(express.static('public'))

app.use(bodyParser.json())

app.use('/',require('./routes/routes'))


app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

const server = app.listen(port, () => console.log(`Uber Book app listening on port ${port}!`))

module.exports = server