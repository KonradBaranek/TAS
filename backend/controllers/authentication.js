var passport = require('passport');
var User = require('../models/user');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  

module.exports.register = function(req, res) {

    var user = new User(
      { name: req.body.name,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address,
        access: req.body.access
      });

      
  
    user.setPassword(req.body.password);
      
    console.log("user", user);
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
      console.log(err);
    });
  
  };

  module.exports.remove = function(req, res) {
      
    console.log("delete user ", req.body);
    
    var query = {'_id': req.body._id};
    //req.newData = req.body;
    User.findOneAndDelete(query, function(err, doc){
    if (err) return res.send(500, { error: err });
      return res.send({status: 200});
    });
  };

  module.exports.update = function(req, res) {
      
    console.log("updated user", req.body);
    
    var query = {'_id': req.body._id};
    //req.newData = req.body;
    User.findOneAndUpdate(query, req.body, {upsert:false}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send({status: 200});
});
  
  };
  
  module.exports.login = function(req, res) {

    /*if(!req.body.name || !req.body.password) {
    sendJSONresponse(res, 400, {
    "message": "All fields required"
    });
    return;
    }*/
  
    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  
  };

  