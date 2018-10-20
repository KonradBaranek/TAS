var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeliverySchema = new Schema(
  {
    IDDelivery: {type: Number, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
  }
)

//Export model
module.exports = mongoose.model('Delivery', DeliverySchema);