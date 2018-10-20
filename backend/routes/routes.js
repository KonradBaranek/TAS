const express = require ('express');
const router = express.Router();

//tutaj dodajecie swoje routesy
router.use('/',require('./books'))

//wyrzuca stronę
router.get('/',(req,res,next)=>{
    res.sendFile('index.html')
})

module.exports = router