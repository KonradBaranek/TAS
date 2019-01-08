import { Component, OnInit } from '@angular/core';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  public list:Array<any>
  public price
  constructor() { }

  ngOnInit() {

    var listString = localStorage.getItem('bucket')
    this.list = JSON.parse(listString)
    this.price = 0;
    this.list.forEach(element=>{
      this.price+= element.amount*element.price;
    })

  //   this.price = this.list.reduce((sum,book)=>{
  //     return sum+book.price;
  // },0)


  }

  delete(book) {
    var n = this.list.filter(function (el) {
      return el!=book
    });
    this.list = n
    localStorage.setItem("bucket", JSON.stringify(this.list))
    this.price = 0;
    this.list.forEach(element=>{
      this.price+= element.amount*element.price;
    })

  //   this.price = this.list.reduce((sum,book)=>{
  //     return sum+book.price;
  // },0)

  }

  setAmount(book){
    var listString = localStorage.getItem('bucket')
    this.list = JSON.parse(listString)
    this.price = 0;
    this.list.forEach(element=>{
      if (book.isbn==element.isbn)
      element.amount = book.amount;
      this.price+= element.amount*element.price;
    }
    )
    localStorage.setItem("bucket",JSON.stringify(this.list));
  }

}
