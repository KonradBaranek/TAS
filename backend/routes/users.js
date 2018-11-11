const router = require('express').Router()
const User = require('../models/user');

router.post('/users/register', function(req, res, next){
    User.findOne({id: req.body.email}).then(function(user){
        if(user===null){
            User.create(req.body).then(function(user){
                res.status(200).send(user);
            }).catch(next);
        }else{
            res.status(500).send({error:'Error: User of that email already exists!'});
        }
    });
});

router.get('/users/list', function(req, res, next){
    User.find({}).then(function(users){
        if(users.length === 0){
            res.status(404).send({error: 'Error: There are no users'})
        }else{
            res.status(200).send(users);
        }
    });
});

module.exports = router;