const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    IDAuthor: {type: Number, required: false}, 
    name: {type: String, required: true, max: 50},
    surname: {type: String, required: true, max: 50},
    genre: {type: String,  enum: ["fantasy","mystery","romance","thriller","drama","adventure"],  required: false},
    dateOfBirth: {type: Date, required: false},
    dateOfDeath: {type: Date, required: false},
    descritpion: {type: String, required: false},
    cover: {type: String, required: false},
  }
)

AuthorSchema.methods.add = function (){
  this.findOne({IDAuthor: this.IDAuthor}).then( author =>{
    if(author){
      console.log(`author with isbn: ${this.IDAuthor} already exists`)
    }else{
      this.create(this)
    }
  })
}

module.exports = mongoose.model('Author', AuthorSchema);