import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject, Observable, merge } from "rxjs";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from "rxjs/operators";
import BooksService from "../books/books.service";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.css"]
})
export class NewBookComponent implements OnInit {
  @ViewChild("instance") instance: NgbTypeahead;
  focusAuthor$ = new Subject<string>();
  clickAuthor$ = new Subject<string>();
  focusGenre$ = new Subject<string>();
  clickGenre$ = new Subject<string>();


  constructor(private booksService: BooksService) {}

  book: any = {
    isbn: 0,
    title: "xd",
    authors: "",
    cover: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png",
    price: 0.0,
    description: "",
    genre: "fantasy",
    year: null,
    amount: 100
  };

  public authors;
  public authorsNames = [];

  public genres = ['fantasy', 'mystery', 'romance', 'thriller', 'drama', 'adventure'];
  public valid = {
    isbn: true
  };

  ngOnInit() {
    this.booksService.getAllAuthorsNames().subscribe(res => {
      this.authorsNames = (res as Array<any>).map(e => `${e.name} ${e.surname}`);
      this.authors = res;
    });
  }

  validateISBN(popover) {
    if (this.book != null && (this.book.isbn.toString().length === 13 || (this.book.isbn.toString().length === 10))) {
      this.valid.isbn = true;
      popover.close();
    } else {
      popover.open();
      this.valid.isbn = false;
    }
  }

  save() {
    console.log('authors', this.authors);
    let tmp = this.book.authors;
    this.book.authors = this.authors.find(e => `${e.name} ${e.surname}` == this.book.authors)._id;
    this.booksService.saveBook(this.book).subscribe(res => {
      this.book = res;
      this.book.authors = tmp;
    });
  }

  searchAuthor = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickAuthor$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focusAuthor$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.authorsNames
          : this.authorsNames.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  }

  searchGenre = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickGenre$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focusGenre$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.genres
          : this.genres.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  }
}
