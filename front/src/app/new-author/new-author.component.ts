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
  selector: "app-new-author",
  templateUrl: "./new-author.component.html",
  styleUrls: ["./new-author.component.css"]
})
export class NewAuthorComponent implements OnInit {
  @ViewChild("instance") instance: NgbTypeahead;
  focusGenre$ = new Subject<string>();
  clickGenre$ = new Subject<string>();

  constructor(private booksService: BooksService) {}

  author: any = {
    IDAuthor:"",
    name: "",
    surname: "",
    dateOfBirth: null,
    dateOfDeath: null,
    cover: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png",
    description: "",
    genre: "fantasy"

  };

  public genres = ['fantasy', 'mystery', 'romance', 'thriller', 'drama', 'adventure'];
  public valid = {
    surname: true
  };

  ngOnInit() {
  }



  save() {
   this.booksService.saveAuthor(this.author).subscribe(res => {
      this.author = res;
    });
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
