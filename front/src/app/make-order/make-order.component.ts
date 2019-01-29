import { Component, OnInit } from '@angular/core';
import OrdersService from "../orders/orders.service";


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  constructor(private ordersService: OrdersService) {}

  newOrder;
  orderPosted;
  orders;
  validName;
  validSurname;
  validAddress;
  order = {
    IDOrder: 0,
    books: [],
    name: "",
    surname: "",
    date: new Date(),
    status: "przyjęte",
    totalPrice: 0.0,
    address: "",
    delivery: {
      name: "odbiór osobisty",
      price: 0
    }
  };

  deliveries = [
    {
      name: "odbiór osobisty",
      price: 0
    },
    {
    name: "kurier",
    price: 15
  },
  {
    name: "poczta",
    price: 5
  }
]

  ngOnInit() {
    this.newOrder= true;
    this.orderPosted = false;
    this.validName = true;
    this.validSurname = true;
    this.validAddress = true;
    var table = JSON.parse(localStorage.getItem("bucket"))
    table.forEach(element => {
      this.order.totalPrice+= element.price * element.amount
    });
    this.order.totalPrice+= this.order.delivery.price;

    this.ordersService.getAllOrders().subscribe(res => {
      this.orders=res;
    });
  }


  validateName(){
    var namePattern = new RegExp('^[A-ZŻŁÓŚĆŹ][a-zęółśążźćń]*$');
    if(!namePattern.test(this.order.name))
      this.validName = false;
    else this.validName = true;
  }

  validateSurname(){
    var namePattern = new RegExp('^[A-ZŻŁÓŚĆŹ][a-zęółśążźćń]*(-[A-ZŻŁÓŚĆŹ][a-zęółśążźćń]*)?$');
    if(!namePattern.test(this.order.surname))
      this.validSurname = false;
        else this.validSurname = true;
  }

  validateAddress(){
    var addressPattern = new RegExp('^ul\. .+ [0-9]{2}-[0-9]{3} [A-ZŻŁÓŚĆŹ][a-zęółśążźćń]*( [A-ZŻŁÓŚĆŹ][a-zęółśążźćń]*)*$');
    if(!addressPattern.test(this.order.address))
    this.validAddress = false;
    else this.validAddress = true;
  }

  makeOrder() {
    this.validateAddress();
    this.validateName();
    this.validateSurname();
    if(this.validName && this.validSurname && this.validateAddress){

  
    var table = JSON.parse(localStorage.getItem("bucket"))
    table.forEach(element => {
      //this.order.totalPrice+= element.price * element.amount
      this.order.books.push(element)
    });

    var maxId=0;
    if(this.orders!==null){
    this.orders.forEach(element => {
      if(element.IDOrder>maxId) maxId=element.IDOrder;
    });
    this.order.IDOrder = maxId+1;
  }

    this.ordersService.postOrder(this.order).subscribe(res => {
    });

    this.newOrder = false;
    this.orderPosted = true;
    localStorage.removeItem("bucket");
  }
  }
  setDelivery(event){
    this.order.totalPrice = 0;
    var table = JSON.parse(localStorage.getItem("bucket"))
    table.forEach(element => {
      this.order.totalPrice+= element.price * element.amount
    });
    var p=0;
    this.deliveries.forEach(element=>{
      if(event.target.value==element.name) p=element.price;
    })
    this.order.delivery = {
      name: event.target.value,
      price: p
    }
    this.order.totalPrice+= this.order.delivery.price;
  }
} 
