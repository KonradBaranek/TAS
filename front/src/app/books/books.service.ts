import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export default class BooksService {

  constructor(private _http: HttpClient) { }

  getAllBooks() {
    return this._http.get('http://localhost:3000/books');
  }

  saveBook(book: any){
    return this._http.post('http://localhost:3000/books', book);
  }

  getAllAuthorsNames() {
    return this._http.get('http://localhost:3000/authors');
  }
}
