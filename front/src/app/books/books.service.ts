import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export default class BooksService {

  constructor(private _http: HttpClient) { }

  public books = {data: null};
  
  getSharedBooks(){
    this.updateBooks(1);
    return this.books;
  }

  updateBooks(pageNo){
    console.log(pageNo)
    this._http.get(`http://localhost:3000/books?${pageNo}=&size=2`).subscribe(res => {
      this.books.data = res;
    })
  }

  filterBooksByTitle(query: string){
    this._http.get(`http://localhost:3000/filterByTitle?search=${query}`).subscribe(res =>{
      this.books.data = res;
    });
  }

  getAllBooks() {
    return this._http.get('http://localhost:3000/books?pageNo=&size=12');
  }

  saveBook(book: any){
    return this._http.post('http://localhost:3000/books', book);
  }

  getAllAuthorsNames() {
    return this._http.get('http://localhost:3000/authors');
  }
  
  getFilterBooksByTitle(query: string){
    return this._http.get(`http://localhost:3000/filterByTitle?search=${query}`);
  }

  getFilterBooksByAuthors(query: string){
    return this._http.get(`http://localhost:3000/filterByAuthors?search=${query}`);
  }

  getFilterBooksByGenre(query: string){
    return this._http.get(`http://localhost:3000/filterByGenre?search=${query}`);
  }
}
