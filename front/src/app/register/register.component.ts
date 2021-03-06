import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    access: "user"
  };

  constructor(private auth: AuthenticationService,
    private router: Router) {}

  register() {
    console.log("registered: ",this.credentials);
    this.auth.register(this.credentials).subscribe((res) => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }
}
