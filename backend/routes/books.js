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

// router.get('/books', function(req, res, next){
//     Book.find({}).limit(9).then(function(books){
//         if(books.length === 0){
//             res.status(404).send({error: 'Error: There are no books'})
//         }else{
//             res.status(200).send(books);
//         }
//     });
// });

router.get('/books',(req,res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size

         Book.find({},{},query,function(err,data) {
           //fetch all data from collection.
              if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
                res.status(404).json(response);
              } else {
                response = {"error" : false,"message" : data};
                console.log("chief we did it")
                res.status(200).json(response);
              }

          });
  })

router.get('/books/:isbn', function(req, res, next){
    Book.findOne().then(function(books){
        if(books.length === 0){
            res.status(404).send({error: 'Error: There are no books'})
        }else{
            res.status(200).send(books);
        }
    });
});

router.get('/filter', function(req, res, next){
    Book.find({
         title: new RegExp(req.query.search),
        /*authors: new RegExp(req.query.search),
        genre: new RegExp(req.query.search)*/
    }).limit(5).then(function(books){
        console.log(books)
        res.status(200).send(books);
    });
});


module.exports = router;