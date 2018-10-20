const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    IDOrder: {type: Number, required: true}, 
    isbns: [Number],
    date:  {type: Date, default: Date.now},
    dueBack: {type: Date, default: Date.now},
    status: {type: String, required: true, enum: ['Maintenance'], default: 'Maintenance'},
    totalPrice: {type: Number, required: false},
    address: {type: String, required: true},
    delivey: {type: Number, required: true}
  }
)

module.exports = mongoose.model('Order', OrderSchema);