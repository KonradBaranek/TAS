import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export default class BooksService {

  constructor(private _http: HttpClient) { }

  @Output() booksChange :EventEmitter<any> = new EventEmitter();

  update(by: any, page: number, bywhat: string){
    if(by){
      this.getFilterBooks(by, bywhat, page ? page : 1).subscribe(res =>{
        this.booksChange.emit(res);
      })
    }else {
      this.getAllBooks(page ? page : 1).subscribe(res=>{
        this.booksChange.emit(res);
      })
    }
  }

  getAllBooks(pagenum) {
    return this._http.get(`http://localhost:3000/books?pageNo=${pagenum}&size=12`);
  }

  saveBook(book: any){
    return this._http.post('http://localhost:3000/books', book);
  }

  saveAuthor(author: any){
    return this._http.post('http://localhost:3000/authors', author);
  }

  getAllAuthorsNames() {
    return this._http.get('http://localhost:3000/authors');
  }

  getBook(isbn: any) {
    return this._http.get('http://localhost:3000/books/');
  }

  getFilterBooks(query: string, bywhat, pagenum){
    return this._http.get(`http://localhost:3000/filter${bywhat}?search=${query}&pageNo=${pagenum}&size=12`);
  }

  getFilterBooksByTitle(query: string, pagenum){
    return this._http.get(`http://localhost:3000/filterByTitle?search=${query}&pageNo=${pagenum}&size=12`);
  }

  getFilterBooksByAuthors(query: string, pagenum){
    return this._http.get(`http://localhost:3000/filterByAuthors?search=${query}&pageNo=${pagenum}&size=12`);
  }

  getFilterBooksByGenre(query: string,  pagenum){
    return this._http.get(`http://localhost:3000/filterByGenre?search=${query}&pageNo=${pagenum}&size=12`);
  }
}
