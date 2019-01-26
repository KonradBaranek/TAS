import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import BooksService  from './books/books.service'

//import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //twój emitter do którego można subskrybować
  title = 'front';
  key = "";
  number=1;
  constructor(private _router : Router, private booksService: BooksService){}


  onKey(key: string) {
    this.key=key;
    this._router.navigate(["/books"], {queryParams: {key: key}});
  }

  update(key: string) {
    this.key=key;
    this.booksService.filterBooksByTitle(key);
  }

  next()
  {
    this.number+=1;
    
    this.booksService.updateBooks(this.number);
    console.log(this.booksService.books);
  }

  previous()
  {
    if(this.number>1)
    {
      this.number-=1;
      this._router.navigate(["/books"], {queryParams: {number: this.number}});
      console.log(this.number);
      this.booksService.updateBooks(this.number);
    }
  }
}
