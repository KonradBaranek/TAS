import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router) {}

  logout(){
    this.auth.logout();
  }

  delete(){
    console.log("deleted: ",this.auth.getUserDetails());
    this.auth.delete(this.auth.getUserDetails()).subscribe((res) => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log("user",this.details);
    }, (err) => {
      console.error(err);
    });
  }
}
