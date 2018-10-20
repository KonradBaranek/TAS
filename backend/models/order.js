const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, 
    isbns: [Number],
    date:  {type: Date, default: Date.now},
    status: {type: String, required: true, enum: [''], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);


module.exports = mongoose.model('BookInstance', BookInstanceSchema);