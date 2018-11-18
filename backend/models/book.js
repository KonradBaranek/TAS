var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    isbn: {type: Number, required: true},
    title: {type: String, required: true},
    authors: {type: [String], required: false},
    cover: {type: String, required: false},
    price: {type: Number, required: true},
    description: {type: String, required: false},
    genre: {type: String,  enum: ["fantasy","mystery","romance","thriller","drama","adventure"],  required: false},
    year: {type: Number, required: false},
    amount: {type: Number, required: true}
  }
);

BookSchema.methods.add = function (){
  this.findOne({isbn: this.isbn}).then( book =>{
    if(book){
      console.log(`Book with isbn: ${this.isbn} already exists`)
    }else{
      this.create(this)
    }
  })
}

//Export model
module.exports = mongoose.model('Book', BookSchema);
