const router = require('express').Router()
const Order = require('../models/order');

router.post('/orders', function(req, res, next){
    // Order.findOne({id: req.body.id}).then(function(order){
    //     if(order===null){
            Order.create(req.body).then(function(order){
                res.status(200).send(order);
            }).catch(next);
    //     }
    //     else{
    //         res.status(500).send({error:'wrong id'});
    //     }
    // });
});

router.get('/orders', function(req, res, next){
    Order.find({}).then(function(orders){
        if(orders.length === 0){
            res.status(200).send(null)
        }else{
            res.status(200).send(orders);
        }
    });
});

module.exports = router;