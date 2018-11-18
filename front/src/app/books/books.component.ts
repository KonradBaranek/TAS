import { Component, OnInit } from '@angular/core';
import BooksService from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  books;

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(res => {
      this.books = res;
    });

  }

}
