const router = require('express').Router()
const Book = require('../models/book');

router.post('/books', function(req, res, next){
    Book.findOne({id: req.body.isbn}).then(function(book){
        if(book===null){
            Book.create(req.body).then(function(book){
                res.status(200).send(book);
            }).catch(next);
        }else{
            res.status(500).send({error:'wrong isbn'});
        }
    });
});

router.get('/books', function(req, res, next){
    Book.find({}).limit(9).then(function(books){
        if(books.length === 0){
            res.status(404).send({error: 'Error: There are no books'})
        }else{
            res.status(200).send(books);
        }
    });
});

router.get('/filter', function(req, res, next){
    Book.find({
        title: {$regex: "req.query.search", $options: "i"},
        /*authors: {$regex: req.query.search, $options: 'i'},
        price: {$regex: req.query.search, $options: 'i'},
        genre: {$regex: req.query.search, $options: 'i'}*/
    }).limit(5).then(function(books){
        console.log(books)
        res.status(200).send(books);
    });
});


module.exports = router;