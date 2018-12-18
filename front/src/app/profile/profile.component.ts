import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService) {}

  logout(){
    this.auth.logout();
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
