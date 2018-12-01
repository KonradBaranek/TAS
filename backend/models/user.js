var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {type: String, trim: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String, trim: true, required: false},
    lastname: {type: String, trim: true, required: false},
    email: {type: String, unique: true, trim: true, required: true},
    phone: {type: Number, required: false},
    address: {type: String, trim: true, required: false},
    access: {type: String, enum:["user","admin"], required: true},
    IDOrders: {type: [Number], required: false},
    hash: String,
    salt: String
  }
);

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "WORK_HARD"); // WORK HARD IS A SECRET
};

/*UserSchema.methods.add = function (){
  this.findOne({id: this.id}).then( user =>{
    if(user){
      console.log(`User with this ID: ${this.id} already exists`)
    } else {
      this.create(this)
    }
  })
  }*/

module.exports = mongoose.model('User', userSchema)