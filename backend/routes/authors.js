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

router.get('/authors/:IDAuthor', function(req, res, next){
    Author.findOne().then(function(authors){
        if(authors.length === 0){
            res.status(404).send({error: 'Error: There are no Authors with selected IDAuthor'})
        }else{
            res.status(200).send(authors);
        }
    });
});

router.post('/authors', function(req, res, next){
    Author.create(req.body).then(function(author){
                res.status(200).send(author);
            }).catch(next);
});

/*
router.post('/authors', function(req, res, next){
    Author.findOne({id: req.body.IDAuthor}).then(function(author){
        if(author===null){
            Author.create(req.body).then(function(author){
                res.status(200).send(author);
            }).catch(next);
        }else{
            res.status(500).send({error:'wrong IDAuthor'});
        }
    });
});
*/



 
module.exports = router;