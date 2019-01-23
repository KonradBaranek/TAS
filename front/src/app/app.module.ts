import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NewAuthorComponent } from './new-author/new-author.component';
import { NewBookComponent } from './new-book/new-book.component';
import { AppRoutingModule } from './app-routing.module';
import { BookViewComponent } from './book-view/book-view.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    BooksComponent,
    AuthorsComponent,
    LoginComponent,
    NewAuthorComponent,
    NewBookComponent,
    RegisterComponent,
    BookViewComponent,
    ProfileComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
