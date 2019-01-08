const express = require ('express');
const router = express.Router();

//tutaj dodajecie swoje routes
router.use('/',require('./books'))
router.use('/',require('./authors'))
router.use('/',require('./orders'))

//wyrzuca stronę
router.get('/',(req,res,next)=>{
    res.sendFile('index.html')
})

module.exports = router