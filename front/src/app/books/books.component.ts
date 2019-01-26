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
    this.books = this.booksService.getSharedBooks();
  }
}
