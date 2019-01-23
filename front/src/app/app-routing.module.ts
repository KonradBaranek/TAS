import { NewBookComponent } from './new-book/new-book.component';
import { BookViewComponent } from './book-view/book-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { EditComponent } from './edit/edit.component';
import { BucketComponent } from './bucket/bucket.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'book', component: BookViewComponent },
  { path: 'newbook', component: NewBookComponent },
  { path: 'edit', component: EditComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'bucket', component: BucketComponent },
  { path: 'make-order', component: MakeOrderComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
