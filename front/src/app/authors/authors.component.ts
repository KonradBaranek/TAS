import { Component, OnInit } from '@angular/core';
import BooksService from "../books/books.service";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  constructor(private booksService: BooksService) { }
  
  authors;

  ngOnInit() {
    this.booksService.getAllAuthorsNames().subscribe(res=>{
      this.authors = res;
      console.log(this.authors);
    });
}
}
