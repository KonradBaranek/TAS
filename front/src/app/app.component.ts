import { Component } from '@angular/core';
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
  key = "";
  number = 1;
  //constructor(_router : Router, public auth: AuthenticationService){}
  constructor(private _router : Router, private booksService: BooksService){}


  onKey(key: string) {
    this.booksService.update(key,this.number)
  }

  update(key: string) {
    this.key=key;
  }

  next()
  {
    this.number+=1;
    this.booksService.update(null,this.number)
  }

  previous()
  {
    if(this.number>1)
    {
      this.number-=1;
      this.booksService.update(null,this.number)
    }
  }
}
