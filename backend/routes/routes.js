const express = require ('express');
const router = express.Router();

//tutaj dodajecie swoje routes
router.use('/',require('./books'))
router.use('/',require('./authors'))

//wyrzuca stronę
router.get('/',(req,res,next)=>{
    res.sendFile('index.html')
})

module.exports = router