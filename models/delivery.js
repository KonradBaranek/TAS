var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeliverySchema = new Schema(
  {
    IDDelivery: {type: number, required: true},
    type: {type: String, required: true},
    prize: {type: number, required: true},
  }
);

// Virtual for book's URL
DeliverySchema
.virtual('url')
.get(function () {
  return '/catalog/delivery/' + this._id;
});

//Export model
module.exports = mongoose.model('Delivery', DeliverySchema);