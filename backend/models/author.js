const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    surname: {type: String, required: true, max: 100},
    cover: {type: String, required: false},
    dateOfBirth: {type: Date},
    dateOfDeath: {type: Date ,required: false},
    descritpion: {type: String, required: false},
    genre: {type: String,  enum: ["fantasy","mystery","romance","thriller","drama","adventure"],  required: false},
  }
)

AuthorSchema.methods.add = function (){
  this.findOne({surname: this.surname}).then( author =>{
    if(author){
      console.log(`author with surname: ${this.surname} already exists`)
    }else{
      this.create(this)
    }
  })
}



module.exports = mongoose.model('Author', AuthorSchema);