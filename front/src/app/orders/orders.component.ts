import { Component, OnInit } from '@angular/core';
import OrdersService from './orders.service';
import BooksService from '../books/books.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private ordersService: OrdersService, private booksService: BooksService) { }

  orders;
  public openDetails;
  
  public setDetails(id) {
    if(id==this.openDetails) this.openDetails = null;
    else this.openDetails=id;
  }

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe(res => {
      this.orders = res;
    });
    /*this.booksService.getAllOrders().subscribe(res => {
      this.orders = res;
    });*/

  }


}
