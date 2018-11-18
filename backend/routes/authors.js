const router = require('express').Router()
const Author = require('../models/author')

router.get('/authors', function(req, res, next){
    Author.find({}).then(function(authors){
        if(!authors){
            res.status(404).send({error: 'Error: There are no Authors'})
        }else{
            res.status(200).send(authors);
        }
    });
});

module.exports = router;