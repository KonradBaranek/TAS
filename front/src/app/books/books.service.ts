import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export default class BooksService {

  constructor(private _http: HttpClient) { }

  @Output() booksChange :EventEmitter<any> = new EventEmitter();

  update(by: any){
    if(by){
      this.getFilterBooks(by).subscribe(res =>{
        this.booksChange.emit(res);
      })
    }else {
      this.getAllBooks().subscribe(res=>{
        this.booksChange.emit(res);
      })
    }
  }

  getAllBooks() {
    return this._http.get('http://localhost:3000/books');
  }

  saveBook(book: any){
    return this._http.post('http://localhost:3000/books', book);
  }

  getAllAuthorsNames() {
    return this._http.get('http://localhost:3000/authors');
  }

  getBook(isbn: any) {
    return this._http.get('http://localhost:3000/books/');
  }

  getFilterBooks(query: string){
    return this._http.get(`http://localhost:3000/filter?search=${query}`);
  }
}
