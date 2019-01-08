const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    IDOrder: {type: Number, required: true}, 
    books: {type: [JSON]},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    date:  {type: Date, default: Date.now},
    status: {type: String, required: true, enum: ["przyjęte","skompletowane","w drodze","oczekujące na odbiór", "zrealizowane"], default: "przyjęte"},
    totalPrice: {type: Number, required: false},
    address: {type: String, required: true},
    delivery: {type: JSON}
  }
)

OrderSchema.methods.add = function (){
  this.findOne({IDOrder: this.IDOrder}).then( order =>{
    if(order){
      console.log(`Order with Id: ${this.IDOrder} already exists`)
    }else{
      this.create(this)
    }
  })
}


module.exports = mongoose.model('Order', OrderSchema);