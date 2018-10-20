const express = require ('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/',(req,res,next)=>{
    res.sendFile('index.html')
})

router.post('/books', function(req, res, next){
    Book.findOne({id: req.body.isbn}).then(function(book){
        if(book===null){
            Book.create(req.body).then(function(book){
                res.status(200).send(book);
            }).catch(next);
        }else{
            res.status(500).send({error:'Error: Book of that id already exists!!'});
        }
    });
});

module.exports = router