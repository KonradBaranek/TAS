const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    surname: {type: String, required: true, max: 100},
    dateOfBirth: {type: Date},
    dateOfDeath: {type: Date},
    descritpion: {type: String, required: false}
  }
)


module.exports = mongoose.model('Author', AuthorSchema);