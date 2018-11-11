var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    id: {type: Number, required: true},
    login: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    access: {type: String, enum:["user","admin"], required: true},
    IDOrders: {type: [Number], required: false}
  }
);

UserSchema.methods.add = function (){
  this.findOne({id: this.id}).then( user =>{
    if(user){
      console.log(`User with this ID: ${this.id} already exists`)
    } else {
      this.create(this)
    }
  })
  }


module.exports = mongoose.model('User', UserSchema)