var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    authors: {type: [number], required: false},
    cover: {type: String, required: false},
    price: {type: number, required: true},
    description: {type: String, required: false},
    genre: {type: String,  enum: ["fantasy","mystery","romance","thriller","drama","adventure"],  required: false},
    year: {type: number, required: false},
    amount: {type: number, required: true}
  }
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);
