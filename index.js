const express = require('express')
const app = express()
const port = 3000
//TODO Mongoose przerzucic do osobnego pliku!!!
const mongoose = require('mongoose');

//trzeba podać własną bazę
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//TODO porobić osobne routingi i spiąć to w indeksie

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile('index.html'))

app.get('/test', (req, res) => res.send('test raz dwa trzy '))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))