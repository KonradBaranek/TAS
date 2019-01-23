const router = require('express').Router()
const Author = require('../models/author')

router.get('/authors', function(req, res, next){
    Author.find({}).then(function(authors){
        if(authors.length === 0){
            res.status(404).send({error: 'Error: There are no Authors'})
        }else{
            res.status(200).send(authors);
        }
    });
});

router.post('/authors', function(req, res, next){
    Author.findOne({id: req.body.surname}).then(function(author){
        if(authors===null){
            Author.create(req.body).then(function(author){
                res.status(200).send(author);
            }).catch(next);
        }else{
            res.status(500).send({error:'wrong data'});
        }
    });
});

router.get('/filter', function(req, res, next){
    Author.find({
        authors: new RegExp(req.query.search),
        genre: new RegExp(req.query.search)
    }).limit(5).then(function(author){
        console.log(author)
        res.status(200).send(author);
    });
});


module.exports = router;
