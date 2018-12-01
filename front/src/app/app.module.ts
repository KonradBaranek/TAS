import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    BooksComponent,
    AuthorsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthenticationService, 
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
