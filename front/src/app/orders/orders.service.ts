import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export default class OrdersService {

  constructor(private _http: HttpClient) { }

  getAllOrders() {
    return this._http.get('http://localhost:3000/orders');
  }

  postOrder(order: any){
    return this._http.post('http://localhost:3000/orders', order);
  }
  
}
