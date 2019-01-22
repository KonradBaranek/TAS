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

  ngOnInit() {
    const param = this._route.snapshot.queryParamMap.get("key");
    //const number = this._route.snapshot.queryParamMap.get("number");
    if(param) {
      this.booksService.getFilterBooks(param).subscribe(res=>{
        console.log(res)
        this.books = res;
      });
    }
    else{
    this.booksService.getAllBooks().subscribe(res=>{
      console.log(res)
      this.books = res;
    });
    }
  }
}
