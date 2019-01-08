import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators/';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  exp: number;
  iat: number;
  access: string;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  access: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      console.log('-->',payload)
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get'|'delete'|'put', type: 'login'|'register'|'profile'|'edit'|'remove', user?): Observable<any> {
    let base;

    if (method === 'post') {

      base = this.http.post(`http://localhost:3000/${type}`, user);
    } else if(method === 'delete'){
      base = this.http.delete(`http://localhost:3000/${type}`, user);
    } else if(method === 'put'){
      base = this.http.put(`http://localhost:3000/${type}`, user);
    }
    else {
      base = this.http.get(`http://localhost:3000/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log("data:",data);
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    console.log("user->", user);
    return this.request('post', 'register', user);
  }

  public edit(user){
    console.log("user->", user);
    return this.request('put','edit', user)
  }

  public delete(user){
    console.log("user->", user);
    return this.request('delete','remove', user)
  }

  public login(user): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
