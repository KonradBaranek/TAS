import { Component, OnInit } from '@angular/core';
import BooksService from './books.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService) { }
  
  books;
  ngOnInit() {
    this.booksService.getAllBooks().subscribe(res=>{
      this.books = res;
      console.log(this.books);
    });
    this.justAdded = -1;
  }

  justAdded;


  ifAdded(isbn) {
    if(this.justAdded==isbn) return true;
    else return false;
  }

  public addToBucket(book) {
    
    if (localStorage.getItem('bucket')==null) {
      var b = [];
      localStorage.setItem("bucket", JSON.stringify(b))
    }

    var bucket = localStorage.getItem('bucket')
    var bucketJSON = JSON.parse(bucket)
    var inBucket = false;
    bucketJSON.forEach(element => {
      if (element.isbn==book.isbn) {
        element.amount+=1;
        inBucket = true;
      }
    });

    if (!inBucket) {book.amount = 1; bucketJSON.push(book)}


    var newBucket = JSON.stringify(bucketJSON);
    localStorage.setItem('bucket', newBucket);
    this.justAdded = book.isbn;
    
  }

}
