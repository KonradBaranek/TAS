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
  title = 'front';
  number = 1;
   //constructor(_router : Router, public auth: AuthenticationService){}
  constructor(private _router : Router, private booksService: BooksService){}

  next()
  {
    this.number+=1;
    this._router.navigate(["/books"], {queryParams: {number: this.number}});
    this.booksService.update(null,this.number,null)
  }

  previous()
  {
    if(this.number>1)
    {
      this.number-=1;
      this._router.navigate(["/books"], {queryParams: {number: this.number}});
      this.booksService.update(null,this.number,null)
    }
  }
}
