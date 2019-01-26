import { Component, OnInit } from '@angular/core';
import BooksService from './books.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService, private _route: ActivatedRoute) { }
  
  books;
  filters;
  number;

  ngOnInit() {

    this.number = this._route.snapshot.queryParamMap.get("number");
    
    const param = this._route.snapshot.queryParamMap.get("key");
    if(param) {
      this.booksService.getFilterBooksByTitle(param).subscribe(res=>{
        console.log(res)
        this.books = res;
      });
    }
    else{
    this.booksService.getAllBooks(this.number).subscribe(res=>{
      console.log(res)
      this.books = res;
    });
    }
  }
}
